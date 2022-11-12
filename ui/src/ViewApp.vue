<script>
   import {
     provideVSCodeDesignSystem,
     vsCodeButton,
     vsCodePanelTab,
     vsCodePanels,
     vsCodePanelView,
     vsCodeDivider,
     vsCodeDataGridRow,
     vsCodeDataGridCell,
     vsCodeTextField,
     vsCodeCheckbox,
     vsCodeDataGrid
   } from "@vscode/webview-ui-toolkit";
   provideVSCodeDesignSystem().register(
     vsCodeButton(),
     vsCodePanelTab(),
     vsCodePanels(),
     vsCodePanelView(),
     vsCodeDivider(),
     vsCodeDataGridRow(),
     vsCodeDataGridCell(),
     vsCodeDataGrid(),
     vsCodeTextField(),
     vsCodeCheckbox()
   );

import "./tabulator_vscode.css"; 
import ToolkitsView from './view_components/ToolkitsView.vue';
import TeamBindingTabView from './view_components/TeamBindingTabView.vue';
import EnvTabView from './view_components/EnvTabView.vue';
import EpvTabView from './view_components/EpvTabView.vue';
import RestServerTabView from './view_components/RestServerTabView.vue';

   export default{
  components: { TeamBindingTabView, EnvTabView, EpvTabView ,ToolkitsView,RestServerTabView},
    computed:{
      toolkits(){
        return window.toolkits;
      },
      teambindings(){
       return window.teambindings;
      },
      envs(){
        return window.envs;
      },
      epvs(){
        return window.epvs;
      },
      rest_servers(){
        return window.rest_servers;
      }
    }
   }
</script>

<template>
 <vscode-panels activeid="tab-1">
   <vscode-panel-tab id="tab-1">Toolkits</vscode-panel-tab>
   <vscode-panel-tab id="tab-2">Team Bindings</vscode-panel-tab>
   <vscode-panel-tab id="tab-3">Environment Variables</vscode-panel-tab>
   <vscode-panel-tab id="tab-4">EPV</vscode-panel-tab>
   <vscode-panel-tab id="tab-5">Servers</vscode-panel-tab>
   

  <vscode-panel-view id="view-1"><toolkits-view :toolkits="toolkits"></toolkits-view></vscode-panel-view>
  <vscode-panel-view id="view-2"><team-binding-tab-view :teambindings="teambindings"></team-binding-tab-view></vscode-panel-view>
  <vscode-panel-view id="view-3"><env-tab-view :envs="envs"></env-tab-view></vscode-panel-view>
  <vscode-panel-view id="view-4"><epv-tab-view :epvs="epvs"></epv-tab-view></vscode-panel-view>
  <vscode-panel-view id="view-5"><rest-server-tab-view :servers="servers"></rest-server-tab-view></vscode-panel-view>
  
</vscode-panels>
</template>

<style scoped>
#app{
  user-select: none;
}
</style>
