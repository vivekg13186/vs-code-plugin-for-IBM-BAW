<template>
<div ref="table">
    </div>
</template>
<script>
import { TabulatorFull as Tabulator } from 'tabulator-tables';

var toTreeNode = function(d){
    var o={};
    o.id  = d.projectId +"."+d.snapshotId;
    o.name = `${d.projectName} (${d.snapshotName})`;
    o.value ="";
    o._children =null;
    if(d.projDeps  && d.projDeps.length>0){
        o._children = d.projDeps.map(toTreeNode);
    }
    return o;
}

export default{
    props : ["toolkits"],
    data(){
        return {
            tablulator : null,
            tableData : []
        }
    },
    mounted(){
        
        this.tableData.splice(0,0,...this.toolkits.map(toTreeNode));
        this.tabulator =  new Tabulator(this.$refs.table,{
            data : this.tableData,
            dataTree : true,
            dataTreeStartExpanded :false,
            height :"500px",
            columns :[
                { title :  "Toolkits" , field : "name" ,width:500  }
            ]
        });
    }
}
</script>