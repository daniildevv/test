<template>
  <div v-if="selectedUser" class="modal fade show" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Платежи пользователя {{ selectedUser.name }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="(payment, index) in selectedUser.payments" :key="payment.id">
              <div class="payment-item">
                <h4>{{ payment.title }}</h4>
                <p>Сумма: {{ payment.amount }}</p>
                <p>Дата: {{ payment.date }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUsersStore } from '@/stores/usersStore'
import { User } from '@/types'

export default defineComponent({
  setup() {
    const usersStore = useUsersStore()

    return {
      selectedUser: usersStore.selectedUser,

      closeModal() {
        usersStore.closeModal()
      }
    }
  }
})
</script>

<style>
/* Стили */
</style>
