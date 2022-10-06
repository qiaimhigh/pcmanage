import { createStore } from 'vuex'

export default createStore({
  state: {
    isShowSide: false,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: "首页",
        icon: 'home'
      }
    ],
    currentMenu: null
  },
  getters: {  
  },
  mutations: {
    changeSide(state){
      state.isShowSide = !state.isShowSide;
    },
    selectMenu(state,val){
      if(val.name !== 'home'){
        state.currentMenu = val;
        const result = state.tabsList.findIndex(item=>item.name===val.name)
        if(result === -1){
          state.tabsList.push(val)
        }else{
          state.currentMenu = null
        }
      }
    },
    removeMenu(state,val){
      let result =  state.tabsList.findIndex(item => item.path === val.path)
      state.tabsList.splice(result,1)
    }
  },
  actions: {
  },
  modules: {
  }
})
