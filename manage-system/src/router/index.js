import Cookie from 'js-cookie' 
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component:()=>import('../views/HomeView.vue'), // 懒加载
    children: [
      // {
      //   path: '/index',
      //   name: 'index',
      //   component: ()=>import('@/components/UserPage.vue')
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: ()=>import('@/components/MallPage.vue')
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: ()=> import('@/components/UserPage.vue')
      // },
      // {
      //   path: '/page1',
      //   name: 'page1',
      //   component: ()=> import('@/components/other/PageOne.vue')
      // },
      // {
      //   path: '/page2',
      //   name: 'page2',
      //   component: ()=> import('@/components/other/PageTwo.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 全局前置导航守卫
router.beforeEach((to)=>{
  let token = Cookie.get('token');
// token不存在，用户没登录，跳转到登录页面
  if(!token &&  to.name !== 'login'){
    return {name: 'login' };
  }
})
export default router
