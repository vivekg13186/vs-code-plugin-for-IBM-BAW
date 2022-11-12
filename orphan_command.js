
const vscode = require("vscode");
const { getOrphanedToolkits } = require("./api");
const { new_id } = require("./utils");


class OrphanAppNode {
    constructor(env, app, childs) {
        this.childs = childs;
        this.env = env;
        this.app = app;
        this.iconPath = new vscode.ThemeIcon("outline-view-icon");
        this.label = `${app.name} (${app.shortName})`;
        this.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
        this.iconPath = new vscode.ThemeIcon("repo");
    }
    async getChildren (element) {
        if (element == undefined) {
            return this.childs;
        }
        return element.getChildren();
    }
}
class OrphanSnapshotNode {
    constructor(env, app, data) {
        this.id = new_id();
        this.env = env;
        this.app = app;
        this.data = data;
        this.contextValue = "orphan_snapshot";
        this.collapsibleState = vscode.TreeItemCollapsibleState.None;
        this.iconPath = new vscode.ThemeIcon("package");
        this.label = `${data.container_snapshot_acronym} (${data.container_branch_acronym})`;
    }

}

function registerViewOrphanTask (id, context, treeProvider) {
    var plugin = vscode.commands.registerCommand(id, async function (data) {
        console.log(data);
        var app= data.data;
        var env = data.env;
        var appName = app.shortName;
        var result = await getOrphanedToolkits(env.host, env.username, env.password, appName);
        if(result && result.length>0){
            var children = result.map(r=>{
                return new OrphanSnapshotNode(env, app, { container_acronym: r.container_acronym, container_snapshot_acronym: r.container_snapshot_acronym, container_branch_acronym: r.container_branch_acronym})
            });
            var appnode  = new OrphanAppNode(env,app,children);
            treeProvider.push(appnode);
        }else{
            vscode.window.showInformationMessage("No orphaned snapshot found");
        }

    });
    context.subscriptions.push(plugin);

}
exports.registerViewOrphanTask = registerViewOrphanTask;


class OrphanTreeProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.childrens = [];
    }

    push (node) {
        this.childrens.push(node);
        this.refresh();
    }
    getTreeItem (element) {
        return element;
    }
    refresh () {
        this._onDidChangeTreeData.fire();
    }


    async getChildren (element) {
        if (element == undefined) {

            return this.childrens;
        }
        return element.getChildren();
    }
}

exports.OrphanTreeProvider = OrphanTreeProvider;