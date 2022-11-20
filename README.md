# IBM BAW Developer Tool

## Table of content

- [Introduction](#introduction)
    - [About this plugin](#typo3-extension-repository)
    - [Installation](#installation)
- [Manage Servers](#manage-servers)
    - [Add new BAW server](#add-new-baw-server)
    - [Remove BAW server](#remove-baw-server)
    - [Update existing BAW server](#update-baw-server)
- [Application Explorer](#application-explorer)
	- [Reload and searching](#reload-and-searching)
    - [View orphaned snapshots](#view-orphan-snapshots)
    - [Snapshot Actions](#snapshot-actions)
- [View Snapshot Configuration](#view-snapshot-configuration)
- [Compare Snapshot Configuration](#compare-snapshot-configuration)
- [View process instance details](#view-process-instance-details)
- [License](#license)
- [Links](#links)



## Introduction

### About this plugin 

Visual studio code plugin for IBM BAW.A handy tool for development team ,devops team and production support team to manage.Plugin provide following features

- Manage multiple BAW enviroment from VSCode without login to multiple urls.
- Manage BAW application snapshots from VSCode.
- Perform  look up for orphaned snapshots.
- Support bulk actions.
- View snapshot configurations like toolkits ,team bindings,REST servers,exposed process variables(EPV),eniroment varaibles.
- View nested toolkit dependecies.
- Compare configuration between two snapshot
- Compare snapshot between across different servers.
- Process smart view for process instance details.
- Open and view multiple process instance details in VSCode

### Installation

Search for "BAW Dev tool" in extension market place (Ctlr+Shift+X)


-----



## Manage Servers

You can add ,remove and update multiple BAW server in the plugin.Mulitple enviroment means you can view and manage application without leaving VSCode or without opening multiple browser tabs.

### Add new BAW server
1. Open an empty text file in VSCode.
1. Type the following lines in order.Note password is optional fields is not includes VSCode will ask later for password
	    Alias name
		Host URL 
		Username
		Password

	- Alias Name  - this is name show in the App Explorer view.Name some thing which can be used to identify the servers like DEV1,TST1 ...
    - Host URL - this the url for BAW server 
    - User name - (this is default username used to call the REST APIs,based on the action this user need required access)
    - Password - this is optional field.It this not provided VSCode will prompt a textbox to add the password.
    
1. Select all the line and type Ctrl+Shiif+P and type "BAW:Add new envoriment".
1. You can view the alias  in the App Explorer

### Remove BAW server
1. Open a new text file .Type the name alias name.
1. Select the text and type Ctrl+Shift+P and type "BAW:Remove enviroment".
1. To remove all the enviroments select "BAW:Remove all environments"

### Update BAW server
1. Open an empty text file in VSCode.
1. Type the following lines in order.Note password is optional fields is not includes VSCode will ask later for password
	    Alias name
		Host URL 
		Username
		Password

	- Alias Name  - **use the existing alias name so the new information get updated**
    - Host URL - this the url for BAW server 
    - User name - (this is default username used to call the REST APIs,based on the action this user need required access)
    - Password - this is optional field.It this not provided VSCode will prompt a textbox to add the password.
    
1. Select all the line and type Ctrl+Shiif+P and type "BAW:Add new envoriment".
1. You can view the alias  in the App Explorer
---

## Application explorer
All the BAW application and toolkits are show in the treeview.All the snapshots are shows under each application.Application name is shown along with the number of snapshots in the brackets.Snapshot name is show along with Branch name and status (Active,Default).

### Reload and Searching
 - Click the reload icon in top left corner of the App explorer.
 - Select a item in the explorer ,then press Ctrl+F a new search dialog appear.

### View Orphaned Snapshot
 - Select a process app,then right click,select 'View orphan snapshot'.
 - All unused snapshots are show under "Orphan snapshot" panel.
 - Bulk selection is alos possible and results get added to the tree view.

### Snapshot actions
 - Select one or multiple snapshots,then right click,you will find options to "Make Default","Archive","Active","DeActive","View configuration".
 - Actions are based on the current status of the selected snapshot(e.g "Make Default not show for a default snapshot").

### View Snapshot Configuration
- **Right click** on the snapshot to view the current server configuration.
- This will show the Toolkits,Enviroment variables,Team Bindings,Servers(only REST),EPVs.
- In toolkits tab you can all the toolkits with nested depedencies.


### Compare Snapshot Configuration
- **Right click** by selecting multiple snaphshot,'Compare config' option is enabled.
- This will list all the difference between the snapshots.
- Click the swap button in between the snapshot name to compare it in reverse.


### View process instance details
- Open an new file and type the instance ids one line each.
- Select all the lines and press Ctrl(Cmd in Mac)+Shift+P. Type **"BAW:View process instance details"**.
- This will open a new tab for each instance and you can view the details.

 
---

## License
Copyright (c) 2023 Saola Software Solutions Private Limited.

## Links
 - [Home website](http://www.saolasoftwaresolutions.com)
 - [Documentation page](http://www.saolasoftwaresolutions.com/BAWDevTool.html)
 - [Youtube tutorial video](https://www.youtube.com/channel/UCNsKBttxhmJGf-LvWBX_G2A/featured)