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

 
 
import { TabulatorFull as Tabulator } from 'tabulator-tables';

function getChildren(t){
           if(t.children){
            return t.children.map(i=>{return {
              "name" : i.name,
              "_children" : getChildren(i)
            }});
           }
           return null;
         }
   export default{
  components: {  },
    computed:{
      ins(){
        return window.input;
      }
    } ,data(){
        return {
            tablulator : null,
            tableData : []
        }
    },mounted(){
        var i = this.ins;
        this.$refs.instanceDetails.rowsData  = [
            { "Name" : "Process Instance Id" , "Value" :i.piid },
            { "Name" : "Status" , "Value" :i.executionState },
            { "Name" : "Instance Name" , "Value" :i.name },
            { "Name" : "Instance Creation Time" , "Value" :i.creationTime },
            { "Name" : "Last Modification Date" , "Value" :i.lastModificationTime },
            { "Name" : "Process App Name" , "Value" :i.processAppName },
            { "Name" : "Process App Acronym" , "Value" :i.processAppAcronym },
            { "Name" : "Snapshot Name" , "Value" :i.snapshotName },
            { "Name" : "Branch Name" , "Value" :i.branchName },
            { "Name" : "Due Date" , "Value" :i.dueDate },         
        ];
  
         
         var root= i.executionTree.root;
         var data   = [{ "name" : root.name ,_children:getChildren(root) }];
    
          this.tableData.splice(0,0,...data);
          
        
         this.tabulator =  new Tabulator(this.$refs.table,{
            data : this.tableData,
            dataTree : true,
            dataTreeStartExpanded :false,
            height :"500px",
            columns :[
                { title :  "Name" , field : "name" ,width:500  }
            ]
        });
    },
    methods:{
      showJSON(d){
        vscode.postMessage({
                        command: 'showJSON',
                        text: JSON.stringify(d,null,4)
                    });
      }
    }
   }
</script>

<template>
  <div>
    <h3>Instance Details</h3>
    <vscode-data-grid
      id="instance-details"
      ref="instanceDetails"
      aria-label="Default"
    ></vscode-data-grid>
    <br>
    <vscode-button @click="showJSON(ins.variables)">View Instance Data</vscode-button>
    <h3>Tasks</h3>

  
    <vscode-data-grid
      id="task-details"
      ref="taskDetails"
      aria-label="Default"
    >
     <vscode-data-grid-row row-type="header">
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="1"
      >
        Task Name
      </vscode-data-grid-cell>
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="2"
      >
        Start Time
      </vscode-data-grid-cell>
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="3"
      >
        Priority
      </vscode-data-grid-cell>
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="4"
      >
        Assigned To
      </vscode-data-grid-cell>
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="5"
      >
        Due Date
      </vscode-data-grid-cell>
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="6"
      >
        Task Id
      </vscode-data-grid-cell>
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="7"
      >
        Status
      </vscode-data-grid-cell>
      <vscode-data-grid-cell
        row-type="columnheader"
        grid-column="8"
      >
         
      </vscode-data-grid-cell>
       </vscode-data-grid-row>
        <vscode-data-grid-row
        v-for="t in ins.tasks"
        v-bind:key="t.tkiid"
      >
        <vscode-data-grid-cell grid-column="1">
          {{  t.displayName  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="2">
          {{  t.startTime  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="3">
          {{  t.priorityName  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="4">
          {{  t.assignedToDisplayName  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="5">
          {{  t.dueTime  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="6">
          {{  t.tkiid  }}
        </vscode-data-grid-cell>
        <vscode-data-grid-cell grid-column="7">
          {{  t.status  }}
        </vscode-data-grid-cell>
    
        <vscode-data-grid-cell grid-column="8">
          <vscode-button @click="showJSON(t.data.variables)">View Task Data</vscode-button>
        </vscode-data-grid-cell>
        
      </vscode-data-grid-row>
    </vscode-data-grid>

    <h3>Execution Tree</h3>
    <div ref="table">
    </div>

  </div>
</template>

<style scoped>
#app {
  user-select: none;
}
</style>
