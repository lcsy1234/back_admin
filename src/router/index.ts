import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { ContainerFilled } from '@ant-design/icons-vue'
// import { Layout } from 'ant-design-vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/content'
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/content',
          name: 'content',
          component: () => import('../views/ContainerPage.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
