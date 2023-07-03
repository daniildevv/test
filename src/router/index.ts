import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import UserList from '../components/UserList.vue'
// import UserDetails from './components/UserDetails.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'UserList',
    component: UserList
  }
  // {
  //   path: '/user/:id',
  //   name: 'UserDetails',
  //   component: UserDetails,
  //   props: true
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
