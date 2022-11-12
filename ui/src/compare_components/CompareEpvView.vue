<template>
  <collapse-panel :title="name">
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
        v-for="l in epv._children"
        v-bind:key="l.id"
      >
        <vscode-data-grid-cell grid-column="1">
          {{  l.name  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="2">
          {{  l.value  }}
        </vscode-data-grid-cell>
         <vscode-data-grid-cell grid-column="3">
          {{  l.mode  }}
        </vscode-data-grid-cell>
         <vscode-data-grid-cell grid-column="4">
          {{  l.oldValue  }}
        </vscode-data-grid-cell>
      </vscode-data-grid-row>

    </vscode-data-grid>
    <vscode-divider></vscode-divider>
  </collapse-panel>
</template>
<script>
import CollapsePanel from '../components/CollapsePanel.vue'
export default {
  components: { CollapsePanel },
  props: ["epv"],
  computed: {
    name () {
      var e = this.epv;
      if(e.mode){
        return  `${e.name} (${e.container_acronym},${e.version_acronym},${e.mode})`;
      }
      return `${e.name} (${e.container_acronym},${e.version_acronym})`;
    }
  }
}
</script>