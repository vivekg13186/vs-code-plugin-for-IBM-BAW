const vscode = require('vscode');
const { makeVersionDefault, makeVersionActive, makeVersionArchive, makeVersionRestore, makeVersionDeActivate } = require('./api');

function registerMakeDefault (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function (data) {
        var env = data.env;
        var ss = data.data;
        var appName = data.app.shortName;

        await makeVersionDefault(env.host, env.username, env.password, appName, ss.acronym);
        vscode.window.showInformationMessage(`${ss.acronym} was set to default snapshot.Reload explorer to view updates`);
    });
    context.subscriptions.push(plugin);

}
exports.registerMakeDefault = registerMakeDefault;



function registerMakeVersionActive (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function (d, datas) {
        datas = datas || [d];
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var env = data.env;
            var ss = data.data;
            var appName = data.app.shortName;

            await makeVersionActive(env.host, env.username, env.password, appName, ss.acronym);
        }
        vscode.window.showInformationMessage(`${datas.length} snapshots activated.Reload explorer to view updates`);
    });
    context.subscriptions.push(plugin);

}
exports.registerMakeVersionActive = registerMakeVersionActive;


function registerMakeVersionArchive (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function (d, datas) {
        datas = datas || [d];
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var env = data.env;
            var ss = data.data;
            var appName = data.app.shortName;

            await makeVersionArchive(env.host, env.username, env.password, appName, ss.acronym);
        }
        vscode.window.showInformationMessage(`${datas.length} snapshots archived.Reload explorer to view updates`);
    });
    context.subscriptions.push(plugin);

}
exports.registerMakeVersionArchive = registerMakeVersionArchive;

function registerMakeVersionRestore (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function (d, datas) {
        datas = datas || [d];
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var env = data.env;
            var ss = data.data;
            var appName = data.app.shortName;

            await makeVersionRestore(env.host, env.username, env.password, appName, ss.acronym);
            
        }
        vscode.window.showInformationMessage(`${datas.length} snapshots restored.Reload explorer to view updates`);
    });
    context.subscriptions.push(plugin);

}
exports.registerMakeVersionRestore = registerMakeVersionRestore;

function registerMakeVersionDeActivate (id, context, treeDataProvider) {
    var plugin = vscode.commands.registerCommand(id, async function (d, datas) {
        datas = datas || [d];
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var env = data.env;
            var ss = data.data;
            var appName = data.app.shortName;

            await makeVersionDeActivate(env.host, env.username, env.password, appName, ss.acronym);
           
        }
        vscode.window.showInformationMessage(`${datas.length} snapshots deactivated.Reload explorer to view updates`);
    });
    context.subscriptions.push(plugin);

}
exports.registerMakeVersionDeActivate = registerMakeVersionDeActivate;

