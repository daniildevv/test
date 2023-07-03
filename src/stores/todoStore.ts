import { createPinia, defineStore } from 'pinia'
import { User, Task } from './userStore'

interface TodoStore {
  users: User[]
  currentUser: User | null
  setCurrentUser: (userId: string) => void
  addUserTasks: (userId: string, tasks: Task[]) => void
  addTask: (text: string, userId: string) => void
  removeTask: (task: Task) => void
  updateTaskDone: (task: Task) => void
  updateTaskText: (task: Task, newText: string) => void
}

const todoStore = defineStore('todoStore', {
  state: () => ({
    users: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        tasks: [
          { id: '1', userId: '1', text: 'Task 1', done: false },
          { id: '2', userId: '1', text: 'Task 2', done: false }
        ]
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phoneNumber: '9876543210',
        tasks: [{ id: '3', userId: '2', text: 'Task 3', done: false }]
      }
    ] as User[],
    currentUser: null as User | null
  }),

  actions: {
    setCurrentUser(userId: string) {
      const user = this.users.find((u) => u.id === userId) || null
      this.currentUser = user
    },
    addUserTasks(userId: string, tasks: Task[]) {
      const user = this.users.find((u) => u.id === userId)
      if (user) {
        user.tasks = tasks
      }
    },
    addTask(text: string, userId: string) {
      const user = this.users.find((u) => u.id === userId)
      if (user) {
        const task: Task = {
          id: Date.now().toString(),
          userId,
          text,
          done: false
        }
        user.tasks.push(task)
      }
    },
    removeTask(task: Task) {
      const user = this.users.find((u) => u.id === task.userId)
      if (user) {
        const taskIndex = user.tasks.findIndex((t) => t.id === task.id)
        if (taskIndex > -1) {
          user.tasks.splice(taskIndex, 1)
        }
      }
    },
    updateTaskDone(task: Task) {
      const user = this.users.find((u) => u.id === task.userId)
      if (user) {
        const foundTask = user.tasks.find((t) => t.id === task.id)
        if (foundTask) {
          foundTask.done = !foundTask.done
        }
      }
    },
    updateTaskText(task: Task, newText: string) {
      const user = this.users.find((u) => u.id === task.userId)
      if (user) {
        const foundTask = user.tasks.find((t) => t.id === task.id)
        if (foundTask) {
          foundTask.text = newText
        }
      }
    }
  }
})

const pinia = createPinia()
export const useTodoStore = pinia.useStore(todoStore)
