<template>
  <div>
    <vscode-data-grid >
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
        v-for="e in values"
        v-bind:key="e.name"
      >
        <vscode-data-grid-cell grid-column="1">
          {{  e.name  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="2">
          {{  e.value  }}
        </vscode-data-grid-cell>
         <vscode-data-grid-cell grid-column="3">
          {{  e.mode  }}
        </vscode-data-grid-cell>
         <vscode-data-grid-cell grid-column="4">
          {{  e.oldValue  }}
        </vscode-data-grid-cell>
      </vscode-data-grid-row>

    </vscode-data-grid>
  </div>
</template>
<script>

import {diff} from "../diff.js";

function transform(envs){
    envs = envs||[];
    return envs.map(i=>{
        i.id  = i.name;
        return i;
    })
}
export default {
    props :["old","nu"],
    data(){
        return {
            values :[]
        }
    },
    mounted(){
        var ot = transform(this.old);
        var nt = transform(this.nu);
        this.values.splice(0,0,...diff(ot,nt))
    }
}
</script>