<template>
  <div class="modal fade show" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Список задач пользователя {{ user.name }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="(task, index) in user.tasks" :key="task.id">
              <div class="d-flex align-items-center">
                <input type="checkbox" :checked="task.done" @input="toggleTaskDone(index)" />
                <span :class="{ 'task-done': task.done }">{{ task.name }}</span>
                <button class="btn btn-sm btn-danger ms-2" @click="deleteTask(index)">
                  Удалить
                </button>
              </div>
              <div v-if="task.editMode">
                <input type="text" v-model="task.editName" class="form-control mt-2" />
                <div class="d-flex justify-content-end mt-2">
                  <button class="btn btn-sm btn-primary me-2" @click="saveTaskEdit(task)">
                    Сохранить
                  </button>
                  <button class="btn btn-sm btn-secondary" @click="cancelTaskEdit(task)">
                    Отмена
                  </button>
                </div>
              </div>
              <div v-else>
                <button class="btn btn-sm btn-secondary" @click="editTask(task)">
                  Редактировать
                </button>
              </div>
            </li>
          </ul>
          <div class="mt-3">
            <input
              type="text"
              v-model="newTaskName"
              class="form-control"
              placeholder="Новая задача"
            />
            <button class="btn btn-sm btn-primary mt-2" @click="addTask">Добавить задачу</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" @click="closeModal"></div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const newTaskName = ref('')

    const closeModal = () => {
      emit('close')
    }

    const toggleTaskDone = (index) => {
      props.user.tasks[index].done = !props.user.tasks[index].done
    }

    const deleteTask = (index) => {
      props.user.tasks.splice(index, 1)
    }

    const editTask = (task) => {
      task.editMode = true
      task.editName = task.name
    }

    const saveTaskEdit = (task) => {
      if (task.editName.trim() === '') {
        return
      }
      task.name = task.editName
      task.editMode = false
    }

    const cancelTaskEdit = (task) => {
      task.editMode = false
    }

    const addTask = () => {
      const newTaskNameValue = newTaskName.value.trim()
      if (newTaskNameValue === '') {
        return
      }
      const newTask = {
        id: props.user.tasks.length + 1,
        name: newTaskNameValue,
        done: false,
        editMode: false,
        editName: ''
      }
      props.user.tasks.push(newTask)
      newTaskName.value = ''
    }

    return {
      newTaskName,
      closeModal,
      toggleTaskDone,
      deleteTask,
      editTask,
      saveTaskEdit,
      cancelTaskEdit,
      addTask
    }
  }
})
</script>

<style>
.task-done {
  text-decoration: line-through;
}
</style>
