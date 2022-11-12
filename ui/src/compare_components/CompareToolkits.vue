<template>
  <div>
    <div ref="table"></div>
  </div>
</template>
<script>
import { TabulatorFull as Tabulator} from "tabulator-tables";
const ADDDED = "added";
const  REMOVED = "removed";
const UDPATED  = "updated";

function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}
function compare(oldRecords,newRecords){
    if(!oldRecords && !newRecords) return null;
    oldRecords = oldRecords||[];
    newRecords =newRecords||[];
    oldRecords = clone(oldRecords);
    newRecords = clone(newRecords);
    let oldRecordsMap ={};
    let newRecordMap = {};
    oldRecords.map(i=> {oldRecordsMap[i.id] =i;});
    newRecords.map(i=>{newRecordMap[i.id] =i;});
    var diffNew = newRecords.filter(i=>!oldRecordsMap[i.id]).map(i=>{
        i.mode = ADDDED;
        return i;
    });
    var diffDeleted = oldRecords.filter(i=>!newRecordMap[i.id]).map(i=>{
        i.mode = REMOVED;
        return i;
    });
    var noChange = newRecords.filter(i=>oldRecordsMap[i.id]);
    noChange.map(i=>{
        var ov = oldRecordsMap[i.id];
        if(i.value !== ov.value){
            i.mode = UDPATED;
            i.name = `${i.projectName} (${ov.snapshotName} -> ${i.snapshotName})`;
            i.oldValue = ov.value;
           
        }else{
             i._children = compare(ov._children,i._children);
        }
    });
    var result = diffNew.concat(diffDeleted).concat(noChange);
    return result;
}
var toTreeNode = function(d){
    var o={};
    o.id  = d.projectId ;
    o.value =d.snapshotId;
    o.projectName =d.projectName;
    o.snapshotName =d.snapshotName;
    o.name = `${d.projectName} (${d.snapshotName})`;
    
    o._children =null;
    if(d.projectDep  && d.projectDeps.length>0){
        o._children = d.projectDep.map(toTreeNode);
    }
    return o;
}
export default {
    props:["old","nu"],
    data(){
        return {
            tablulator : null,
            tableData : []
        }
    },
    mounted(){ 
        var oldRecords = this.old.map(toTreeNode);
        var newRecords = this.old.map(toTreeNode);
        var result = compare(oldRecords,newRecords);
        this.tableData.splice(0,0,...result);
        this.tabulator =  new Tabulator(this.$refs.table,{
            data : this.tableData,
            dataTree : true,
            dataTreeStartExpanded :false,
            height :"500px",
            columns :[
                { title :  "Toolkits" , field : "name" ,width:500  },
                {title : "Action" ,field : "mode"}
            ]
        });
    }
    
}
</script>