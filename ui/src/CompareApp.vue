<template>
  <div>
    <div class="swapbar">
      <vscode-text-field
        disabled
        :value="old_ss.name"
      >Old snapshot</vscode-text-field>

      <vscode-button
        apperance="icon"
        @click="swapSS"
      >
        <span class="codicon codicon-arrow-swap"></span>
      </vscode-button>

      <vscode-text-field
        disabled
        :value="new_ss.name"
      >New snapshot</vscode-text-field>
    </div>
    <vscode-panels activeid="tab-1">
      <vscode-panel-tab id="tab-1">Toolkits</vscode-panel-tab>
      <vscode-panel-tab id="tab-2">Team Bindings</vscode-panel-tab>
      <vscode-panel-tab id="tab-3">Environment Variables</vscode-panel-tab>
      <vscode-panel-tab id="tab-4">EPV</vscode-panel-tab>
      <vscode-panel-tab id="tab-5">Servers</vscode-panel-tab>

      <vscode-panel-view id="view-1">
        <compare-toolkits :old="old_ss.toolkits" :nu="new_ss.toolkits" :key="view_key"></compare-toolkits>
      </vscode-panel-view>
      <vscode-panel-view id="view-2">
        <compare-team-binding-tab-view :old="old_ss.teambindings" :nu="new_ss.teambindings" :key="view_key"></compare-team-binding-tab-view>
      </vscode-panel-view>
      <vscode-panel-view id="view-3">
        <compare-env-tab-view :old="old_ss.envs" :nu="new_ss.envs" :key="view_key"></compare-env-tab-view>
      </vscode-panel-view>
      <vscode-panel-view id="view-4">
        <compare-epv-tab-view :old="old_ss.epvs" :nu="new_ss.epvs" :key="view_key"></compare-epv-tab-view>
      </vscode-panel-view>
      <vscode-panel-view id="view-5">
        <compare-rest-server-tab-view :old="old_ss.rest_servers" :nu="new_ss.rest_servers" :key="view_key"></compare-rest-server-tab-view>
      </vscode-panel-view>

    </vscode-panels>

  </div>
</template>
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
     vsCodeTextField(),
     vsCodeCheckbox(),vsCodeDataGrid()
   );

import "./tabulator_vscode.css"; 
import CompareToolkits from './compare_components/CompareToolkits.vue';
import CompareTeamBindingTabView from './compare_components/CompareTeamBindingTabView.vue';
import CompareEnvTabView from './compare_components/CompareEnvTabView.vue';
import CompareEpvTabView from './compare_components/CompareEpvTabView.vue';
import CompareRestServerView from './compare_components/CompareRestServerView.vue';

 
export default {
    components :{CompareToolkits,CompareTeamBindingTabView,CompareEnvTabView,CompareEpvTabView,CompareRestServerView},
    methods:{
        swapSS(){
            this.swap = !this.swap;
            this.view_key = "view-key"+String(Math.random());
        }
    },
    computed:{
        old_ss(){
            return this.swap  ? window.input.old :  window.input.nu;
        },
        new_ss(){
           return !this.swap  ? window.input.old :  window.input.nu;
        }
    },
    data(){
        return {
            swap : true,
            view_key : "view-key"
        }
    }

}
</script>
<style scoped>
#app{
    user-select:  none;
}
.swapbar{
    display: flex;
    padding: 13px;
    width: 100%;
    align-items: end;
}
</style>