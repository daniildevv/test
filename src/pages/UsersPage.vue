<template>
  <div>
    <h1>Страница Пользователей</h1>
    <UserList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserList from '@/components/UserList.vue'

export default defineComponent({
  components: {
    UserList
  }
  // Остальной код компонента
})
</script>

<style>
/* Стили */
</style>
