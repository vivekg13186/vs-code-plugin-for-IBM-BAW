const vscode = require("vscode");

const {getKeys} = require("./docs");
const {new_id} = require("./utils");


class TestCaseNode {
    constructor(name) {
        this.id = new_id();
        this.label = name;
        this.contextValue = "testcase";
        this.iconPath = new vscode.ThemeIcon("ports-open-browser-icon");
         this.collapsibleState = vscode.TreeItemCollapsibleState.None;
    }
    getChildren () {
        return [];
    }
}

class TestCaseTreeProvider{
    constructor(context){
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.testCases = [];
    }
    getTreeItem (element) {
        return element;
    }
    refresh () {
        this._onDidChangeTreeData.fire();
    }

    
    async getChildren (element) {
        if (element == undefined) {
            var result = [];
            var keys = await getKeys();
            for (var i = 0; i < keys.length; i++) {
                var c = keys[i];
                this.testCases.push(c);
                result.push(new TestCaseNode(c));
            }
            return result;
        }
        return element.getChildren();
    }
}

exports.TestCaseTreeProvider = TestCaseTreeProvider;