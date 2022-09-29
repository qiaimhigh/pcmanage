import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component:()=>import('../views/HomeView.vue'), // 懒加载
    children: [
      {
        path: '/mall',
        name: 'mall',
        component: ()=>import('@/components/UserPage.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: ()=> import('@/components/MallPage.vue')
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
