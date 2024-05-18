const vscode = require('vscode');
const view_panel = require("./view_panel");
const compare_panel =require("./compare_panel");
const view_instance = require("./view_instance");
const { BAWTreeProvider } = require('./app_explorer_tree');
const {TestCaseTreeProvider} = require("./testController");
const { registerAddNewConnection, registerDeleteConnection, registerDeleteAllConnections } = require('./connections');
const { registerMakeDefault, registerMakeVersionActive, registerMakeVersionArchive, registerMakeVersionDeActivate, registerMakeVersionRestore } = require('./snapshot');
const { registerViewOrphanTask, OrphanTreeProvider } = require('./orphan_command');
const { setDatabase } = require('./docs');



var treeProvider;
var orphanTreeProvider ;
var testcaseTreeProvider;
async function activate (context) {
	await setDatabase(context)
	
	treeProvider = new BAWTreeProvider(context);
	orphanTreeProvider = new OrphanTreeProvider(context);
	testcaseTreeProvider = new TestCaseTreeProvider(context);
	context.subscriptions.push(vscode.window.createTreeView('appsexplorer',{
		canSelectMany:true,
		showCollapseAll:true,
		treeDataProvider:treeProvider
	}));


	context.subscriptions.push(vscode.window.createTreeView('orphantkexplorer', {
		canSelectMany: true,
		showCollapseAll: true,
		treeDataProvider: orphanTreeProvider
	}));

	context.subscriptions.push(vscode.window.createTreeView('testexplorer', {
		canSelectMany: true,
		showCollapseAll: true,
		treeDataProvider: testcaseTreeProvider
	}));

	view_panel.register("baw.app.support.view.config",context);
	compare_panel.register("baw.app.support.compare.config",context);
	view_instance.register("baw.app.support.view.instance", context, treeProvider);
	registerAddNewConnection("baw.app.support.new.env",context,treeProvider);
	registerDeleteConnection("baw.app.support.delete.env",context,treeProvider);
	registerDeleteAllConnections("baw.app.support.delete.all.env", context, treeProvider);
	registerMakeDefault("baw.app.support.make.default",context,treeProvider);
	registerMakeVersionActive("baw.app.support.make.active", context, treeProvider);
	registerMakeVersionArchive("baw.app.support.archive", context, treeProvider);
	registerMakeVersionDeActivate("baw.app.support.deactive", context, treeProvider);
	//registerMakeVersionRestore("baw.app.support.restore", context, treeProvider);
	registerViewOrphanTask("baw.app.support.view.orphan",context,orphanTreeProvider)
	
	var plugin = vscode.commands.registerCommand("baw.app.support.tree.reload", async function (data) {
		treeProvider.refresh();
	});
	context.subscriptions.push(plugin);
}

function deactivate () { }

module.exports = {
	activate,
	deactivate
}
 

