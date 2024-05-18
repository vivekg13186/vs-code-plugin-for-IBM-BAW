var { getDoc, putDoc } = require("./docs");

const vscode = require("vscode");
const {startService} = require("./api");

function getUri(webview, extensionUri, pathList) {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

async function runTestCase(tc){
  var result = await startService(tc.host,tc.username,tc.password,tc.app,tc.service,tc.input);
  return result;
}
exports.registereEditTestCase = function (id, context, treeProvider) {
  var plugin = vscode.commands.registerCommand(id, async function (treeItem) {
    var tc = await getDoc(treeItem.label);
    if (!tc) return;

    var panel = vscode.window.createWebviewPanel(
      "Test Case",
      treeItem.label,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        enableFindWidget: true,
      }
    );

    var html = generateHTML(panel, context, tc);
    panel.webview.html = html;
    panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "saveTestCase":
            putDoc(treeItem.label, JSON.parse(message.text));
            vscode.window.showInformationMessage(`${treeItem.label} saved`);
            return;
          case "runTestCase":
            var result  = await runTestCase(JSON.parse(message.text));
            if(result){
              panel.webview.postMessage(JSON.stringify(result,null,4));
            }
            vscode.window.showInformationMessage(`${treeItem.label} exected`);
            return;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(plugin);
};

function generateHTML(panel, context, input) {
  var app_js = getUri(panel.webview, context.extensionUri, [
    "media",
    "entry-servicerunner.js",
  ]);
  var collapse_css = getUri(panel.webview, context.extensionUri, [
    "media",
    "_plugin-vue_export-helper.css",
  ]);
  var app_css = getUri(panel.webview, context.extensionUri, [
    "media",
    "service_runner_main.css",
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
