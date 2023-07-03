<template>
  <div>
    <h2 class="mt-3">Список задач пользователя {{ user.name }}</h2>
    <div v-for="(task, index) in tasksStore.tasks" :key="task.id" class="mb-2">
      <div class="input-group">
        <input type="text" v-model="task.name" class="form-control" placeholder="Название задачи" />
        <button @click="tasksStore.deleteTask(index)" class="btn btn-outline-danger">
          Удалить задачу
        </button>
      </div>
    </div>
    <button @click="tasksStore.addTask" class="btn btn-outline-primary">Добавить задачу</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useTasksStore } from '../store/tasksStore'
// import { useUsersStore } from '../store/usersStore'

export default defineComponent({
  setup() {
    // const tasksStore = useTasksStore()
    // const usersStore = useUsersStore()

    return {
      // tasksStore,
      // user: usersStore.users[0]
    }
  }
})
</script>
