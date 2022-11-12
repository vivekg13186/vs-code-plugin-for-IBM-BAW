<template>
  <div style="width:99%">
    <div
      v-for="s in values"
      v-bind:key="s.name"
    >
      <rest-server-view :server="s"></rest-server-view>

    </div>
  </div>
</template>
<script>
import RestServerView from "./RestServerView.vue";
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
    components : {RestServerView},
    props :["servers"],
    data(){
        return { values : []};
    },
    mounted(){
        this.values.splice(0,0,...transform(this.servers));
    }
}
</script>