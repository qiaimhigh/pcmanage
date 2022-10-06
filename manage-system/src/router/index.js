import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component:()=>import('../views/HomeView.vue'), // 懒加载
    children: [
      {
        path: '/index',
        name: 'index',
        component: ()=>import('@/components/UserPage.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: ()=>import('@/components/MallPage.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: ()=> import('@/components/UserPage.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: ()=> import('@/components/other/PageOne.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: ()=> import('@/components/other/PageTwo.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
