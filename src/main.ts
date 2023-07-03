import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import UsersPage from './pages/UsersPage.vue'
import PaymentsPage from './pages/PaymentsPage.vue'

import 'bootstrap/dist/css/bootstrap.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/users' },
    { path: '/users', component: UsersPage },
    { path: '/payments', component: PaymentsPage }
  ]
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
