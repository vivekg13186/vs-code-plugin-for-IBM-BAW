var { getENVs, getEPVs, getProcessAppSettings, getRESTServers, getTeamBindings, getProcessInstanceDetails } = require("./api");

const vscode = require("vscode");
const { getConnections, getConnection, findConnection } = require("./storage");

function getUri (webview, extensionUri, pathList) {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

 

function getSelectedText () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return "";

    const document = editor.document;
    const selection = editor.selection;
    if (!document || !selection) return "";
    const text = document.getText(selection);
    return text || "";
}


function register (id, context,treeProvider) {

    var plugin = vscode.commands.registerCommand(id, async function (d ) {
        
        var data = getSelectedText().split("\n");
        if (data.length < 2) {
            vscode.window.showErrorMessage("Unexpected input.Requires 'Enviroment Name','Instance ids*'");
            return;
        }
        data = data.map(i=>i.trim());
    
        var c = await findConnection(context,data[0]);
        if(!c)return;
        for(var i=1;i<data.length;i++){
            var instanceid = data[i];
            var input = await getProcessInstanceDetails(c.host,c.username,c.password,instanceid);
            
            var panel = vscode.window.createWebviewPanel('Instance Details', ` ${instanceid}-Instance Details`, vscode.ViewColumn.One, {
                enableScripts: true,
                enableFindWidget: true
            });

            
            var html = generateHTML(panel, context, input);
            panel.webview.html = html;
            panel.webview.onDidReceiveMessage(
                message => {
                    switch (message.command) {
                        case 'showJSON':
                            vscode.workspace.openTextDocument(
                                {
                                    content : message.text,
                                    language :"json"
                                }
                            );
                            
                            return;
                    }
                },
                undefined,
                context.subscriptions
            );
        }
       
    });

    context.subscriptions.push(plugin);
}

function generateHTML (panel, context, input) {
    var app_js = getUri(panel.webview, context.extensionUri, ["media", "entry-instance.js"]);
    var collapse_css = getUri(panel.webview, context.extensionUri, ["media", "_plugin-vue_export-helper.css"]);
    var app_css = getUri(panel.webview, context.extensionUri, ["media", "view_instance_main.css"]);
    
    var icon_css = getUri(panel.webview, context.extensionUri, ["node_modules", "@vscode/codicons", "dist", "codicon.css"]);
    return `
    <!doctype  html>
    <html lang="">
    <head> 
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title></title>
        <link href="${collapse_css}" rel="stylesheet">
        <link href="${icon_css}" rel="stylesheet">
          <link href="${app_css}" rel="stylesheet">
        
       
        <script>
        const vscode = acquireVsCodeApi();
            window.input = ${JSON.stringify(input)};
        </script>
        </head>
        <body>
            <div id="app"></div>
            <script type="module" src="${app_js}"></script>
        </body>
        </html>
    `
}

exports.register = register;