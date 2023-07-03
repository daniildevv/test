<template>
  <div>
    <nav>
      <router-link to="/users">Пользователи</router-link>
      <router-link to="/payments">Платежи</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserList from './components/UserList.vue'

export default defineComponent({
  name: 'App',
  components: {
    UserList
  }
})
</script>

<style>
/* Стили для навигационного меню */
nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
}
</style>
