const { deleteConnection, updateConnection, deleteAllConnections } =require( './storage');

const vscode = require('vscode');

function getSelectedText () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return "";

    const document = editor.document;
    const selection = editor.selection;
    if (!document || !selection) return "";
    const text = document.getText(selection);
    return text ||"";
}
exports.registerAddNewConnection =  function registerAddNewConnection (id, context, treeDataProvider) {

    var plugin = vscode.commands.registerCommand(id, async function () {


        var data = getSelectedText().split("\n");
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
        }
       await updateConnection(context, connectionName, host, username, password);
        vscode.window.showInformationMessage(`${connectionName} added`);
        treeDataProvider.refresh();
    });
    context.subscriptions.push(plugin);
}


exports.registerDeleteConnection=  function registerDeleteConnection (id, context,treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function () {
        var connectionName = getSelectedText();
        if(connectionName.trim()){
           await deleteConnection(context,connectionName);
        }
        vscode.window.showInformationMessage(`${connectionName} removed`);
        treeDataProvider.refresh();
    });
    context.subscriptions.push(plugin);

}

exports.registerDeleteAllConnections =   function registerDeleteConnection (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function () {
        await deleteAllConnections(context);
        vscode.window.showInformationMessage(`all environments removed`);
        treeDataProvider.refresh();
    });
    context.subscriptions.push(plugin);

}