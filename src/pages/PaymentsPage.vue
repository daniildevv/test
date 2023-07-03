<template>
  <div>
    <h1>Страница Платежей</h1>
    <div v-for="payment in payments" :key="payment.id" class="payment-item">
      <h3>{{ payment.title }}</h3>
      <p>Сумма: {{ payment.amount }}</p>
      <p>Дата: {{ payment.date }}</p>
      <button @click="showPaymentDetails(payment)">Подробнее</button>
    </div>

    <div v-if="selectedPayment" class="modal">
      <div class="modal-content">
        <span class="close" @click="closePaymentDetails">&times;</span>
        <h2>Детали платежа</h2>
        <p>Название: {{ selectedPayment.title }}</p>
        <p>Сумма: {{ selectedPayment.amount }}</p>
        <p>Дата: {{ selectedPayment.date }}</p>
        <!-- Другие детали платежа -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'

interface Payment {
  id: number
  title: string
  amount: number
  date: string
  // Другие свойства платежа
}

export default defineComponent({
  data() {
    return {
      payments: [
        { id: 1, title: 'Платеж 1', amount: 100, date: '2023-07-01' },
        { id: 2, title: 'Платеж 2', amount: 200, date: '2023-07-02' },
        { id: 3, title: 'Платеж 3', amount: 300, date: '2023-07-03' }
      ] as Payment[],
      selectedPayment: null as Payment | null
    }
  },
  methods: {
    showPaymentDetails(payment: Payment) {
      this.selectedPayment = payment
    },
    closePaymentDetails() {
      this.selectedPayment = null
    }
  }
})
</script>

<style scoped>
.payment-item {
  margin-bottom: 20px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
