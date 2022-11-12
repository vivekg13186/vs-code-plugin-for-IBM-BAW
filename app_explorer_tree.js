
const vscode = require("vscode");
const { getProcessApps, getToolkits } = require("./api");
const { getConnections, getPaswordForConnection } = require("./storage");

const {new_id} =require("./utils");


class SnapshotNode {
    constructor(env, app, data) {
        this.id = new_id();
        this.env = env;
        this.data = data;
        this.app = app;
        this.isDefault = app.defaultVersion == data.name;
        this.contextValue = "snapshot";
        this.collapsibleState = vscode.TreeItemCollapsibleState.None;;
        this.iconPath = this.getIcon();
        this.label = this.getLabel();
    }
    getIcon () {
        if (this.data.active) {
            return new vscode.ThemeIcon("package");
        }
        if (this.isDefault) {
            return new vscode.ThemeIcon("package", new vscode.ThemeColor("mergeEditor.change.background"));
        }
        return new vscode.ThemeIcon("package", new vscode.ThemeColor("diffEditor.insertedTextBackground"));
    }
    getLabel () {
        var component = [this.data.branchName];
        this.data.active ? component.push("Active") : "";
        this.data.isDefault ? component.push("Default") : "";
        return `${this.data.name} (${component.join(",")})`
    }
}

class AppNode {
    constructor(env, data) {
        this.id = new_id();
        this.env = env;
        this.data = data;
        this.contextValue = "app";
        this.collapsibleState = data.installedSnapshots ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;
        this.iconPath = new vscode.ThemeIcon("outline-view-icon");
        this.label = this.getLabel();
    }

    getLabel () {
        var name = `${this.data.name} (${this.data.shortName})`
        if (this.data.installedSnapshots) { name += ` (${this.data.installedSnapshots.length})` }
        return name;
    }
    getChildren () {
        var app = this.data;
        return this.data.installedSnapshots.map(s => {
            return new SnapshotNode(this.env, app, s);
        })
    }
}

class AppsNode {
    constructor(title, env) {
        this.id = new_id();
        this.env = env;
        this.label = title;
        this.contextValue = "apps";
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        this.iconPath = this.label == "Applications" ? new vscode.ThemeIcon("repo") : new vscode.ThemeIcon("repo-clone");
    }
    async getChildren () {
        var apps = null;

        apps = this.label === "Applications" ?
            await getProcessApps(this.env.host, this.env.username, this.env.password) :
            await getToolkits(this.env.host, this.env.username, this.env.password);
        if (apps) {
            this.label == this.label + `- ${apps.length}`;
            var result = apps.map(a => {
                return new AppNode(this.env, a);
            });
            return result;
        }
        return [];
    }
}

class EnvNode {
    constructor(name, env) {
        this.id = new_id();
        this.env = env;
        this.label = name;
        this.contextValue = "enviroment";
        this.iconPath = new vscode.ThemeIcon("ports-open-browser-icon");
        this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    }
    getChildren () {
        return [
            new AppsNode("Applications", this.env),
            new AppsNode("Toolkits", this.env)
        ]
    }
}

class BAWTreeProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.envs = [];
    }
     
    getTreeItem (element) {
        return element;
    }
    refresh () {
        this._onDidChangeTreeData.fire();
    }

    getConnectionDetails(connectionName){
        for(var i=0;i<this.envs.length;i++){
            if(this.envs[i].connectionName === connectionName){
                return this.envs[i];
            }
        }
        return null;
    }
    async getChildren (element) {
        if (element == undefined) {
            var result = [];
            var connections = await getConnections(this.context);
            for (var i = 0; i < connections.length; i++) {
                var c = connections[i];
                var env = {
                    host: c.host,
                    username: c.username,
                    password: await getPaswordForConnection(this.context, c)
                }
                this.envs.push(env);
                result.push(new EnvNode(c.connectionName, env));
            }
            return result;
        }
        return element.getChildren();
    }
}

exports.BAWTreeProvider = BAWTreeProvider;