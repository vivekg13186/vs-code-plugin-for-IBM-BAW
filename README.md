# IBM BAW Developer Tool

This is a visual studio code plugin for IBM BAW.

## Requirements

* npm install
* Run -> Start without Debugging in VS Code
* Production buikd instruction here


## Features

### Add BAW server
- Open a file in VS code.Type the server details in following format.
    Alias Name (this name shown in the explorer view e.g.DEV1,TST1 etc .. )
    Host URL   (host name of the BAW server)
    User Name (this is default username,some functions need admin access in BAW)
    Password
- Select all the lines and press Ctrl(Cmd in Mac)+Shift+P. Type "BAW:Add new environment".
- Select the option.Now open the BAW explorer from activity bar you will see the new enviroment.
- Open the Application and Toolkits to view all the applications and toolkit.Right click to see the possible action that can be done.

### Reload application and toolkits
 - Click the reload icon in the top left corner to reload all the applications from server.

### Orphaned snapshots
  - Right click on the toolkit application and select 'Orphan toolkit' this will list all the toolkit versions not used by the other applications.

### Snapshot Actions
- Right click on the snaphshot you get option to Activate,Deactivate,Archive,Make Default Option.
- Select multiple snapshots to perform bulk action.

### View configurations
- Right click on the snapshot to view the current server configuration.
- This will show the Toolkits,Enviroment variables,Team Bindings,Servers(only REST),EPVs.
- In toolkits tab you can all the toolkits with nested depedencies.

### Compare configurations
- Right click by selecting multiple snaphshot,'Compare config' option is enabled.
- This will list all the difference between the snapshots.
- Click the swap button in between the snapshot name to compare it in reverse.

### View instance details
- Open an new file and type the instance ids one line each.
- Select all the lines and press Ctrl(Cmd in Mac)+Shift+P. Type "BAW:View process instance details".
- This will open a new tab for each instance and you can view the details.

### Search or Filter apps in BAE explorer
- Start typing the text this will auto fitler the tree content this is a default VS code feature.


## License
Copyright (c) 2023 Saola Software Solutions Private Limited.
 - [Home website](http://www.saolasoftwaresolutions.com)
 - [Documentation page](http://www.saolasoftwaresolutions.com)
 - [Youtube tutorial video](https://www.youtube.com/channel/UCNsKBttxhmJGf-LvWBX_G2A/featured)