var {
  getProcessInstanceDetails,
} = require("./api");

const vscode = require("vscode");
const { getConnections } = require("./storage");

function getUri(webview, extensionUri, pathList) {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}


function register(id, context, treeProvider) {
  var plugin = vscode.commands.registerCommand(id, async function () {
    var connectionList = await getConnections(context);
    connectionList = connectionList.map(function (con) {
      return con.connectionName;
    });
    var connectionName = await vscode.window.showQuickPick(connectionList);

    var instanceid = await vscode.window.showInputBox({
      placeHolder: "2334345",
      title: "Enter instance id",
    });
    if (!instanceid) {
      vscode.window.showErrorMessage("Enter instance id");
      return;
    }

    var c = connectionList.filter((ci) => ci.connectionName == connectionName);

    if (!c) return;

    var input = await getProcessInstanceDetails(
      c.host,
      c.username,
      c.password,
      instanceid
    );

    var panel = vscode.window.createWebviewPanel(
      "Instance Details",
      ` ${instanceid}-Instance Details`,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        enableFindWidget: true,
      }
    );

    var html = generateHTML(panel, context, input);
    panel.webview.html = html;
    panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "showJSON":
            vscode.workspace.openTextDocument({
              content: message.text,
              language: "json",
            });

            return;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(plugin);
}

function generateHTML(panel, context, input) {
  var app_js = getUri(panel.webview, context.extensionUri, [
    "media",
    "entry-instance.js",
  ]);
  var collapse_css = getUri(panel.webview, context.extensionUri, [
    "media",
    "_plugin-vue_export-helper.css",
  ]);
  var app_css = getUri(panel.webview, context.extensionUri, [
    "media",
    "view_instance_main.css",
  ]);

  var icon_css = getUri(panel.webview, context.extensionUri, [
    "node_modules",
    "@vscode/codicons",
    "dist",
    "codicon.css",
  ]);
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
    `;
}

exports.register = register;
