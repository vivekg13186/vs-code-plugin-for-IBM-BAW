<template>
    <div>
        <collapse-panel :title="title">
        <div style="padding-left:12px">
             <vscode-data-grid>
        <vscode-data-grid-row v-for="l in teambinding._children" v-bind:key="l.id">
          <vscode-data-grid-cell grid-column="1"  >
             <div class="row"> 
                <div class="codicon" :class="icon(l)"></div>
                <div>{{l.name}}</div>
             </div>
          </vscode-data-grid-cell>
          <vscode-data-grid-cell grid-column="2"  >
             <div class="row"> 
                <div>{{l.mode}}</div>
             </div>
          </vscode-data-grid-cell>
          </vscode-data-grid-row>
          
      </vscode-data-grid>
            </div>
        </collapse-panel>
        <vscode-divider></vscode-divider>
    </div>
</template>
<script>
import CollapsePanel  from "../components/CollapsePanel.vue";

export default{
    components : {CollapsePanel},
    props: ["teambinding"],
    methods:{
        icon(l){
            return l.type == 'user'  ? 'codicon-person' : 'codicon-organization';
        }
    },
    computed:{
        title(){
            var tb = this.teambinding;
            if(tb.mode){
                return `${tb.name} (${tb.mode})`;
            }
            return tb.name;
        }
    }
}
</script>
<style>
.row{
    display:flex;
    align-items :center;
    justify-self : start
}
.codicon{
    padding-left : 5px;
    padding-right : 5px;
}
</style>