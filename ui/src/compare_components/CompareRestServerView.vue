<template>
  <div>
    <collapse-panel :title="server.name">
      <vscode-data-grid>
        <vscode-data-grid-row row-type="header">
          <vscode-data-grid-cell
            row-type="columnheader"
            grid-column="1"
          >
            Name
          </vscode-data-grid-cell>
          <vscode-data-grid-cell
            row-type="columnheader"
            grid-column="2"
          >
            Current Value
          </vscode-data-grid-cell>
          <vscode-data-grid-cell
            row-type="columnheader"
            grid-column="3"
          >
            Change
          </vscode-data-grid-cell>
          <vscode-data-grid-cell
            row-type="columnheader"
            grid-column="4"
          >
            Old Value
          </vscode-data-grid-cell>
        </vscode-data-grid-row>

        <vscode-data-grid-row
          v-for="e in server._children"
          v-bind:key="e.name"
        >
          <vscode-data-grid-cell grid-column="1">
            {{  e.name  }}
          </vscode-data-grid-cell>
          <vscode-data-grid-cell grid-column="2">
            {{  e.value  }}
          </vscode-data-grid-cell>
           <vscode-data-grid-cell grid-column="2">
            {{  e.mode  }}
          </vscode-data-grid-cell>
           <vscode-data-grid-cell grid-column="2">
            {{  e.oldValue  }}
          </vscode-data-grid-cell>
        </vscode-data-grid-row>

      </vscode-data-grid>
    </collapse-panel>

  </div>

</template>
<script>
import CollapsePanel from '../components/CollapsePanel.vue'
export default {
  components: { CollapsePanel },
    props :["server"],
    computed :{
        title(){
            var s = this.server;
            if(s.mode){
                return `${s.name} (${s.mode})`
            }
            return s.name;
        }
    }
}

</script>
<style scoped>
.group {
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-bottom: 14px;
}
.group {
  padding-top: 5px;
}
</style>