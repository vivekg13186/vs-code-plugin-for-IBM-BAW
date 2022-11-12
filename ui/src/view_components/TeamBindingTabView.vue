<template>
  <div style="min-width:100%">
     
    <team-binding-view  :teambinding="tb" v-for="tb in teambindings" v-bind:key="tb.participant_id">
        </team-binding-view>
    </div>
</template>
<script>


 
import TeamBindingView from "./TeamBindingView.vue"

export default {
  components: { TeamBindingView },
  props: ["teambindings"],
 

}
</script>
