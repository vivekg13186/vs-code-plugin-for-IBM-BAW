<template>

    <collapse-panel :title="teambinding.name">
      <div style="padding-left:12px">
        <vscode-data-grid>
          <vscode-data-grid-row
            v-for="l in teambinding.user_members"
            v-bind:key="l"
          >
            <vscode-data-grid-cell grid-column="1">
              <div class="row">
                <div class="codicon codicon-person"></div><div>{{l}}</div>
              </div>
            </vscode-data-grid-cell>
          </vscode-data-grid-row>
          <vscode-data-grid-row
            v-for="l in teambinding.groups_members"
            v-bind:key="l"
          >
            <vscode-data-grid-cell grid-column="1">
              <div class="row">
                <div class="codicon codicon-organisation"> </div><div>{{l}}</div>
              </div>
            </vscode-data-grid-cell>
          </vscode-data-grid-row>
        </vscode-data-grid>
      </div>
        <vscode-divider></vscode-divider>
    </collapse-panel>
  
 
</template>
<script>
import CollapsePanel  from "../components/CollapsePanel.vue";

export default{
    components : {CollapsePanel},
    props: ["teambinding"],
}
</script>
<style>
.row {
  display: flex;
  align-items: center;
  justify-self: start;
}
.codicon {
  padding-left: 5px;
  padding-right: 5px;
}
</style>