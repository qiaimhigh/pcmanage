import { createStore } from 'vuex'

export default createStore({
  state: {
    isShowSide: false
  },
  getters: {  
  },
  mutations: {
    changeSide(state){
      state.isShowSide = !state.isShowSide;
    }
  },
  actions: {
  },
  modules: {
  }
})
