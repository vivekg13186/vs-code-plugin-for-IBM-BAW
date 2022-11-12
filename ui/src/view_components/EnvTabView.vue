<template>
  <div>
    
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
      </vscode-data-grid-row>

      <vscode-data-grid-row
        v-for="e in envs"
        v-bind:key="e.name"
      >
        <vscode-data-grid-cell grid-column="1">
          {{  e.name  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="2">
          {{  e.value  }}
        </vscode-data-grid-cell>
      </vscode-data-grid-row>

    </vscode-data-grid>
  </div>
</template>
<script>

 

export default {
  props: ["envs"],

}
</script>
