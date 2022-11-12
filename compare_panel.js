var { getENVs, getEPVs, getProcessAppSettings, getRESTServers, getTeamBindings } = require("./api");

const vscode = require("vscode");

function getUri (webview, extensionUri, pathList) {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}

  function register (id, context) {

    var plugin = vscode.commands.registerCommand(id, async function (_,datas) {
        var old = datas[0];
        var nu= datas[0];

        if(old.app.shortName != nu.app.shortName){
            vscode.window.showErrorMessage("Not possible to compare snapshot for different application");
        }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            cancellable: false,
            title: "BAW:  fetching snapshot details..."
        }, async (progess) => {

            progess.report({ "increment": 0 });

            var env1 = datas[0].env;
            var env2 = datas[1].env;
            var ss1 = datas[0].data;
            var ss2 = datas[1].data;

            var input = {old : { name  : `${old.app.shortName}/${ss1.name}`},nu :{ name : `${nu.app.shortName}/${ss2.name}`}};


            input.old.toolkits = await getProcessAppSettings(env1.host, env1.username, env1.password, ss1.ID);
            input.old.toolkits = input.old.toolkits ? input.old.toolkits.projDeps : [];
            progess.report({ "increment": 10 });

            input.nu.toolkits = await getProcessAppSettings(env2.host, env2.username, env2.password, ss2.ID);
            input.nu.toolkits = input.nu.toolkits ? input.nu.toolkits.projDeps : [];
            progess.report({ "increment": 20 });


            input.old.teambindings = await getTeamBindings(env1.host, env1.username, env1.password, old.app.shortName, ss1.acronym)||[];
            progess.report({ "increment": 30 });
            input.nu.teambindings = await getTeamBindings(env2.host, env2.username, env2.password, nu.app.shortName, ss2.acronym)||[];
            progess.report({ "increment": 40 });


            input.old.envs = await getENVs(env1.host, env1.username, env1.password, old.app.shortName, ss1.acronym) || [];
            progess.report({ "increment": 50 });
            input.nu.envs = await getENVs(env2.host, env2.username, env2.password, nu.app.shortName, ss2.acronym) || [];
            progess.report({ "increment": 60 });


            input.old.epvs = await getEPVs(env1.host, env1.username, env1.password, old.app.shortName, ss1.acronym) || [];
            progess.report({ "increment": 70 });
            input.nu.epvs = await getEPVs(env2.host, env2.username, env2.password, nu.app.shortName, ss2.acronym) || [];
            progess.report({ "increment": 80 });

            input.old.rest_servers = await getRESTServers(env1.host, env1.username, env1.password, old.app.shortName, ss1.acronym) || [];
            progess.report({ "increment": 90 });
            input.nu.rest_servers = await getRESTServers(env2.host, env2.username, env2.password, nu.app.shortName, ss2.acronym) || [];
            progess.report({ "increment": 100 });

            var panel = vscode.window.createWebviewPanel('Compare Configuration', `Compare Configuration`, vscode.ViewColumn.One,{
                enableScripts:true,
                enableFindWidget: true
            });
            var html = generateHTML(panel, context, input);
            panel.webview.html = html;

        });
    });
      context.subscriptions.push(plugin);
}

function generateHTML (panel, context, input) {
    var app_js = getUri(panel.webview, context.extensionUri, ["media", "entry-compare.js"]);
    var app_css = getUri(panel.webview, context.extensionUri, ["media", "compare_app_main.css"]);

    var icon_css = getUri(panel.webview, context.extensionUri, ["node_modules", "@vscode/codicons", "dist", "codicon.css"]);
    var other_css = getUri(panel.webview, context.extensionUri, ["media", "_plugin-vue_export-helper.css"]);
    var collapse_css = getUri(panel.webview, context.extensionUri, ["media", "CollapsePanel.css"]);

    return `
    <!doctype  html>
    <html lang="">
    <head> 
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title></title>
        <link href="${icon_css}" rel="stylesheet">
        <link href="${other_css}" rel="stylesheet">
        <link href="${collapse_css}" rel="stylesheet">
         <link href="${app_css}" rel="stylesheet">
        <script>
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

exports.register =register;