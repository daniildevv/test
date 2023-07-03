<template>
  <div>
    <h1 class="mt-4">Список пользователей</h1>
    <div v-for="(user, index) in userStore.users" :key="user.id" class="mb-4">
      <div class="mb-2">
        <input
          type="text"
          v-model="user.name"
          class="form-control"
          placeholder="Имя пользователя"
        />
      </div>
      <div class="mb-2">
        <input
          type="email"
          v-model="user.email"
          class="form-control"
          placeholder="Email пользователя"
        />
      </div>
      <div class="mb-2">
        <input
          type="tel"
          v-model="user.phone"
          class="form-control"
          placeholder="Номер телефона пользователя"
        />
      </div>
      <button @click="userStore.deleteUser(user.id)" class="btn btn-danger">Удалить</button>
      <button @click="userStore.editUser(user)" class="btn btn-primary">Редактировать</button>
      <button @click="userStore.showTodoListModal(user)" class="btn btn-secondary">
        Список задач
      </button>
      <TodoListModal
        :user="user"
        v-if="userStore.selectedUser === user && userStore.showModal"
        @close="userStore.closeModal"
      />
      <EditUserModal
        v-if="userStore.selectedUser === user && userStore.showEditModal"
        @close="userStore.closeModal"
        @update="userStore.updateUser"
      />
    </div>
    <button @click="userStore.showAddUserModal" class="btn btn-primary">
      Добавить пользователя
    </button>

    <div v-if="userStore.isAddUserModalVisible" class="modal fade show" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Добавить пользователя</h5>
            <button type="button" class="btn-close" @click="userStore.hideAddUserModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <input
                type="text"
                v-model="userStore.newUserName"
                class="form-control"
                placeholder="Имя пользователя"
              />
            </div>
            <div class="mb-2">
              <input
                type="email"
                v-model="userStore.newUserEmail"
                class="form-control"
                placeholder="Email пользователя"
              />
            </div>
            <div class="mb-2">
              <input
                type="tel"
                v-model="userStore.newUserPhone"
                class="form-control"
                placeholder="Номер телефона пользователя"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="userStore.hideAddUserModal">
              Отмена
            </button>
            <button type="button" class="btn btn-primary" @click="userStore.addUser">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userStore.isAddUserModalVisible" class="modal-backdrop fade show"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TodoListModal from './TodoListModal.vue'
import EditUserModal from './EditUserModal.vue'

import { useUserStore } from '@/stores/userStore'

interface Task {
  id: number
  name: string
  done: boolean
}

interface User {
  id: number
  name: string
  email: string
  phone: string
  tasks: Task[]
}

// const useUserStore = defineStore({
//   id: 'user',
//   state: () => ({
//     users: [
//       {
//         id: 1,
//         name: 'Пользователь 1',
//         email: 'user1@example.com',
//         phone: '123456789',
//         tasks: [
//           { id: 1, name: 'Задача 1', done: false },
//           { id: 2, name: 'Задача 2', done: true }
//         ]
//       },
//       {
//         id: 2,
//         name: 'Пользователь 2',
//         email: 'user2@example.com',
//         phone: '987654321',
//         tasks: [
//           { id: 1, name: 'Задача 1', done: false },
//           { id: 2, name: 'Задача 2', done: false }
//         ]
//       }
//     ] as User[],
//     newUserName: '',
//     newUserEmail: '',
//     newUserPhone: '',
//     isAddUserModalVisible: false,
//     selectedUser: null as User | null,
//     showModal: false,
//     showEditModal: false,
//     isModalVisible: false
//   }),
//   actions: {
//     showAddUserModal() {
//       this.isAddUserModalVisible = true
//     },
//     hideAddUserModal() {
//       this.isAddUserModalVisible = false
//       this.newUserName = ''
//       this.newUserEmail = ''
//       this.newUserPhone = ''
//     },
//     addUser() {
//       const newUser: User = {
//         id: this.users.length + 1,
//         name: this.newUserName,
//         email: this.newUserEmail,
//         phone: this.newUserPhone,
//         tasks: []
//       }
//       this.users.push(newUser)
//       this.hideAddUserModal()
//     },
//     deleteUser(userId: number) {
//       const index = this.users.findIndex((user) => user.id === userId)
//       if (index !== -1) {
//         this.users.splice(index, 1)
//       }
//     },
//     editUser(user: User) {
//       this.selectedUser = user
//       this.showEditModal = true
//     },
//     showTodoListModal(user: User) {
//       this.selectedUser = user
//       this.showModal = true
//     },
//     closeModal() {
//       this.showModal = false
//     }
//   }
// })

export default defineComponent({
  components: {
    TodoListModal,
    EditUserModal
  },
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  }
})
</script>

<style>
h1 {
  font-size: 24px;
}

.btn {
  margin-top: 8px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal.fade.show {
  display: block;
}
</style>
