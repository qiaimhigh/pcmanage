<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
let route = useRoute();
console.log(route);
let router = useRouter()
let store = useStore();
let tabsList = computed(()=>store.state.tabsList)
function clickTag(path){
    router.push(path)
}
function handleClose(tag,index){
    const length = tabsList.value.length-1;
    
    if(tag.path !== route.path && index !== length){
        store.commit('removeMenu',tag)
        return ;
    }
    if(length === index){
        router.push({
            path: tabsList.value[index-1].path
        })
    }else{
        router.push({
            path: tabsList.value[index].path
        })
    }
    store.commit('removeMenu',tag)
}
</script>
<template>
    <div class="tags">
        <el-tag @click="clickTag(tag.path)" :effect="route.path === tag.path ? 'dark':'plain'"  size="large" @close="handleClose(tag,index)" style="min-width: 20px; margin: 5px;" v-for="(tag,index) in tabsList" :key="tag.path" :closable="tag.path !== '/'" type="">
            {{tag.label}}
        </el-tag>
    </div>  
</template>
<style lang=''>
</style>