import { defineStore } from 'pinia'

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

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [
      {
        id: 1,
        name: 'Пользователь 1',
        email: 'user1@example.com',
        phone: '123456789',
        tasks: [
          { id: 1, name: 'Задача 1', done: false },
          { id: 2, name: 'Задача 2', done: true }
        ]
      },
      {
        id: 2,
        name: 'Пользователь 2',
        email: 'user2@example.com',
        phone: '987654321',
        tasks: [
          { id: 1, name: 'Задача 1', done: false },
          { id: 2, name: 'Задача 2', done: false }
        ]
      }
    ] as User[],
    newUserName: '',
    newUserEmail: '',
    newUserPhone: '',
    isAddUserModalVisible: false,
    selectedUser: null as User | null,
    showModal: false,
    showEditModal: false,
    isModalVisible: false,
    editedUser: null as User | null,
    originalUser: null as User | null
  }),
  actions: {
    showAddUserModal() {
      this.isAddUserModalVisible = true
    },
    hideAddUserModal() {
      this.isAddUserModalVisible = false
      this.newUserName = ''
      this.newUserEmail = ''
      this.newUserPhone = ''
    },
    addUser() {
      const newUser: User = {
        id: this.users.length + 1,
        name: this.newUserName,
        email: this.newUserEmail,
        phone: this.newUserPhone,
        tasks: []
      }
      this.users.push(newUser)
      this.hideAddUserModal()
    },
    deleteUser(userId: number) {
      const index = this.users.findIndex((user) => user.id === userId)
      if (index !== -1) {
        this.users.splice(index, 1)
      }
    },
    editUser(user: User) {
      this.selectedUser = user
      this.editedUser = user

      this.originalUser = { ...user }

      this.showEditModal = true
    },
    showTodoListModal(user: User) {
      this.selectedUser = user
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.showEditModal = false
    },
    updateUser(updatedUser: User) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = updatedUser
        this.editedUser = null
      }
    }
  }
})
