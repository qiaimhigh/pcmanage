import { computed } from "vue";
import { mapState,useStore } from "vuex";

export const useMapState  = (getKeys)=>{
    let store = useStore();
    let storeState = {};
    const storeFns =  mapState(getKeys);

    Object.keys(storeFns).forEach(key => {
        const fn = storeFns[key].bind({$store:store});
        storeState[key] = computed(fn)
    })

    return storeState;
    
}