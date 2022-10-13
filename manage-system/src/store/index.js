import Cookie from 'js-cookie';
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
    currentMenu: null,
    asideMenu: []
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
    },
    getAsideMenu(state,data){
      state.asideMenu = data;
    },
    // 动态添加路由
    addRoute(state,router){
      // 判断缓存中是否有数据
      if(!Cookie.get('menu')) return ;
      const menu = JSON.parse(Cookie.get('menu'));
      state.asideMenu = menu;
      // 动态路由的数据
      const asideArray = [];
      menu.forEach(item => {
        if(item.children) {
          item.children = item.children.map(item => {
            item.component = import (`@/components${item.url}.vue`)
            return item;
          })
          asideArray.push(...item.children)
        }else{
          if(item.path !== '/')   item.component = import(`@/components${item.url}.vue`);
          else item.component = import(`@/views${item.url}.vue`);
          asideArray.push(item)
        }
        
      });  
      console.log(asideArray);
      asideArray.forEach((item)=>{
          router.addRoute('main',item)
      })
      
    
    }
  },
  actions: {
  },
  modules: {
  }
})
