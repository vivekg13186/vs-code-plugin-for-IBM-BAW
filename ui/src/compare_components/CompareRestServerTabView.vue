<template>
  <div style="width:99%">
    <div
      v-for="s in values"
      v-bind:key="s.name"
    >
      <compare-rest-server-view :server="s"></compare-rest-server-view>

    </div>
  </div>
</template>
<script>
import {diff} from "../diff";
import CompareRestServerView from './CompareRestServerView.vue';
function transform(servers){
    servers = servers||[];
    return servers.map(s=>{
        return {
            id : s.server_name,
            name : s.server_name,
            value :s.server_name,
            _children:[
                { id : "host_name" , name :"host_name" ,value  :s.host_name},
                { id : "request_timeout" , name :"request_timeout" ,value  :s.request_timeout},
                { id : "response_timeout" , name :"response_timeout" ,value  :s.response_timeout},
                { id : "use_https" , name :"use_https" ,value  :s.use_https},
            ]
        }
    })
}
export default {
    components : {CompareRestServerView},
    props :["old","nu"],
    data(){
        return { values : []};
    },
    mounted(){
        var ot = transform(this.old);
        var nt   = transform(this.nu);
        var s = diff(ot,nt);
        this.values.splice(0,0,...s);
    }
}
</script>