<template>
  <div style="width:99%">
    <epv-view
      v-for="e in epvs"
      :epv="e"
      v-bind:key="e.id"
    ></epv-view>
  </div>
</template>
<script>
import EpvView from "./EpvView.vue";
 

export default {
  components: { EpvView },
  props: ["epvs"],
  

}
</script>
