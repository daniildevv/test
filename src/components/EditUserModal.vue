<template>
  <div v-if="editedUser" class="modal fade show" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Редактировать данные пользователя</h5>
          <button type="button" class="btn-close" @click="cancelChanges"></button>
        </div>
        <div class="modal-body">
          <div class="mb-2">
            <input
              type="text"
              v-model="editedUser.name"
              class="form-control"
              placeholder="Имя пользователя"
            />
          </div>
          <div class="mb-2">
            <input
              type="email"
              v-model="editedUser.email"
              class="form-control"
              placeholder="Email пользователя"
            />
          </div>
          <div class="mb-2">
            <input
              type="tel"
              v-model="editedUser.phone"
              class="form-control"
              placeholder="Номер телефона пользователя"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancelChanges">Отмена</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  emits: ['update', 'close'],
  setup(_, { emit }) {
    const usersStore = useUserStore()

    const cancelChanges = () => {
      usersStore.updateUser(usersStore.originalUser)
      usersStore.closeModal()
      emit('close') // Генерация события close
    }

    const saveChanges = () => {
      if (usersStore.editedUser) {
        const updatedUser = { ...usersStore.editedUser }

        usersStore.updateUser(updatedUser)
        usersStore.closeModal()
        emit('update') // Генерация события update
      }
    }

    return {
      editedUser: usersStore.editedUser,
      cancelChanges,
      saveChanges
    }
  }
})
</script>

<style>
/* Стили */
</style>
