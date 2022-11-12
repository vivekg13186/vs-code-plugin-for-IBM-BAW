<template>
  <div style="width:99%">
    <search-text @search="filter"></search-text>
    <compare-epv-view
      v-for="e in values"
      :epv="e"
      v-bind:key="e.id"
    ></compare-epv-view>
  </div>
</template>
<script>
import CompareEpvView from "./CompareEpvView.vue";
 import {diff} from "../diff.js";

 function t2(ev){
    ev = ev||[];
    return ev.map(e=> {return {name : e.name, id:e.name ,value :e.current_value}});
 }
function transform(epvs){
    epvs = epvs||[];
    return epvs.map(e=>{
        var id  = `${e.name} (${e.container_acronym},${e.version_acronym})`;
        return { name : e.name ,id :id ,value : e.name ,_children :t2(e.epv_variables) ,container_acronym :e.container_acronym,version_acronym:e.version_acronym};
    })
}
export default {
  components: { CompareEpvView    },
  props: ["old","nu"],
  data () {
    return {
      values: []
    }
  },
  mounted () {
    var ot  = transform(this.old);
    var nt = transform(this.nu);
    this.values.splice(0,0,...diff(ot,nt));
  },
   

}
</script>
