<template>
  <div style="min-width:100%">

    <compare-team-binding-view
      :teambinding="tb"
      v-for="tb in values"
      v-bind:key="tb.id"
    ></compare-team-binding-view>

  </div>
</template>
<script>
import CompareTeamBindingView from './CompareTeamBindingView.vue';
import {diff} from "../diff";

function t1(arr,type){
  if(!arr)return [];
    return arr.map(i=>{
        return {name : i ,value : i,type :type,id :i};
    });
}
 
 function t2(tb){
    var _children = t1(tb.group_members,'user').concat(t1(tb.group_members,'group'));
    return {
        id :  tb.participant_id,
        name : tb.name,
        value : tb.participant_id,
        _children :_children
    }
 }
 function compare(old_teambindings,nu_teambindings){
    var ot = old_teambindings.map(t2);
    var nt  = nu_teambindings.map(t2);
    return diff(ot,nt);
 }
export default {
  components: {CompareTeamBindingView  },
  props: ["nu","old"],
  data () {
    return {
      values: []
    }
  },
 
  mounted() {
     this.values.splice(0,0,...compare(this.old,this.nu));
  },

}
</script>
