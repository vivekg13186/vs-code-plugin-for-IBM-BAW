const { deleteConnection, updateConnection, deleteAllConnections,getConnections } = require('./storage');

const vscode = require('vscode');

//returns current text in editor
function getSelectedText () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return "";

    const document = editor.document;
    const selection = editor.selection;
    if (!document || !selection) return "";
    const text = document.getText(selection);
    return text || "";
}
function isValidHttpUrl (string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

exports.registerAddNewConnection = function registerAddNewConnection (id, context, treeDataProvider) {

    var plugin = vscode.commands.registerCommand(id, async function () {

        var host = await vscode.window.showInputBox({ placeHolder: "http://localhost:8080", title: "Enter host url" });
        if (!isValidHttpUrl(host)) {
            vscode.window.showErrorMessage("Enter BAW enviroment url");
            return;
        }
        var username = await vscode.window.showInputBox({ placeHolder: "user1", title: "Enter user name" });
        if (!username) {
            vscode.window.showErrorMessage("Enter username");
            return
        }
        var password = await vscode.window.showInputBox({ placeHolder: "password", password: true, title: "Enter password" });
        if (!password) {
            vscode.window.showErrorMessage("Enter password");
            return
        }
        var connectionName = await vscode.window.showInputBox({ placeHolder: "DEV1", title: "Enter connection name" });
        if (!connectionName) {
            vscode.window.showErrorMessage("Enter connection name");
            return
        }


        /*var data = getSelectedText().split("\n");
        if (data.length < 2) {
            vscode.window.showErrorMessage("Unexpected input.Requires 'Connection name','Host','Username','Password'");
            return;
        }
        const connectionName = data[0].trim();
        const host = data[1].trim();
        const username = data[2].trim();
        const password = data.length == 4 ? data[3].trim() : await vscode.window.showInputBox({
            placeHolder: "password",
            password: true,
            prompt: "Enter password"
        });
        if (!connectionName || !host || !username || !password) {
            vscode.window.showErrorMessage("Unexpected input.Requires 'Connection name','Host','Username','Password'");
            return;
        }*/
        await updateConnection(context, connectionName, host, username, password);
        vscode.window.showInformationMessage(`${connectionName} added`);
        treeDataProvider.refresh();
    });
    context.subscriptions.push(plugin);
}


exports.registerDeleteConnection = function registerDeleteConnection (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function () {
        var connectionList = await getConnections(context);
        connectionList= connectionList.map(function(con){
            return con.connectionName;
        });
        var connectionName =await vscode.window.showQuickPick(connectionList);

        //var connectionName = getSelectedText();
        if (connectionName.trim()) {
            await deleteConnection(context, connectionName);
        }
        vscode.window.showInformationMessage(`${connectionName} removed`);
        treeDataProvider.refresh();
    });
    context.subscriptions.push(plugin);

}

exports.registerDeleteAllConnections = function registerDeleteConnection (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function () {
        await deleteAllConnections(context);
        vscode.window.showInformationMessage(`all environments removed`);
        treeDataProvider.refresh();
    });
    context.subscriptions.push(plugin);

}