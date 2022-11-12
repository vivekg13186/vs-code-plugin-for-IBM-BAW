var { getENVs, getEPVs, getProcessAppSettings, getRESTServers, getTeamBindings } =require ("./api");

const vscode = require("vscode");

function getUri(webview,extensionUri,pathList){
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri,...pathList));
}

 function register(id,context){

    var plugin  = vscode.commands.registerCommand(id,async function(data){
        var env = data.env;
        var ss = data.data;
        var appName = data.app.shortName;
     

        vscode.window.withProgress({
            location : vscode.ProgressLocation.Window,
            cancellable :false,
            title: "BAW:  fetching snapshot details..."
        },async (progess)=>{
            
            progess.report({"increment" : 0});
        
            var input  = {};
            
            input.toolkits = await getProcessAppSettings(env.host,env.username,env.password,ss.ID);
            input.toolkits = input.toolkits ? input.toolkits.projDeps :[];
            progess.report({ "increment": 10 });
           

            input.teambindings = await getTeamBindings(env.host,env.username,env.password,appName,ss.acronym)||[];
            progess.report({ "increment": 25 });
         

            input.envs = await getENVs(env.host, env.username, env.password, appName, ss.acronym)||[];
            progess.report({ "increment": 50 });
            

            input.epvs = await getEPVs(env.host, env.username, env.password, appName, ss.acronym)||[];
            progess.report({ "increment": 75 });
           

            input.rest_servers = await getRESTServers(env.host, env.username, env.password, appName, ss.acronym)||[];
            progess.report({ "increment": 100 });
           
            var panel = vscode.window.createWebviewPanel('View Configuration',`${appName}/${ss.name}-Config`,vscode.ViewColumn.One,{
                enableScripts:true,
                enableFindWidget:true
            });
      
            var html = generateHTML(panel,context,input,"entry-view_app.js");
            panel.webview.html = html;

        });
    });

    context.subscriptions.push(plugin);
}

function generateHTML (panel, context, input, entryJs) {
    var app_js = getUri(panel.webview, context.extensionUri, ["media", "entry-view.js"]);
    var app_css = getUri(panel.webview, context.extensionUri, ["media", "view_app_main.css"]);
    var other_css = getUri(panel.webview, context.extensionUri, ["media", "_plugin-vue_export-helper.css"]);
    var collapse_css = getUri(panel.webview, context.extensionUri, ["media", "CollapsePanel.css"]);
     var icon_css = getUri(panel.webview, context.extensionUri, ["node_modules", "@vscode/codicons", "dist", "codicon.css"]);
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
          <link href="${app_css}" rel="stylesheet">
        <link href="${collapse_css}" rel="stylesheet">
       
        <script>
            window.toolkits = ${JSON.stringify(input.toolkits)};
            window.teambindings = ${JSON.stringify(input.teambindings)};
            window.envs = ${JSON.stringify(input.envs)};
            window.rest_servers = ${JSON.stringify(input.rest_servers)};
            window.epvs = ${JSON.stringify(input.epvs)};
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