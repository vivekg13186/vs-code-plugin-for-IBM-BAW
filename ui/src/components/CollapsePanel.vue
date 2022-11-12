<template>
    <div style="width:100%">
        <div class="title" @click="toggle = !toggle">
            <div class="codicon" :class="{ 'codicon-chevron-down': toggle, 'codicon-chevron-right': !toggle }"></div>
            <div>{{  title  }}</div>
        </div>
        <div class="body" v-show="toggle">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "CollapsePanel",
    props: ["title"],
    data () {
        return { toggle: false };
    }
}
</script>
<style scoped>
.title {
    display: flex;
    padding: 8px;
    cursor: pointer;
}

.title:hover {
    background: var(--list-hover-background);
    outline: 1px dotted var(--contrast-active-border);
}

.body {
    padding-left: 12px;
}
</style>
