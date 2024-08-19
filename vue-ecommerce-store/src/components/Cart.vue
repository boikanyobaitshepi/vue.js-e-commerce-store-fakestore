<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.title }} ({{ item.quantity }})
        <button @click="updateQuantity(item, item.quantity + 1)">+</button>
        <button @click="updateQuantity(item, item.quantity - 1)">-</button>
        <button @click="removeItem(item)">Remove</button>
      </li>
    </ul>
    <p>Total: {{ totalCost }}</p>
    <button @click="clearCart">Clear Cart</button>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'

export default {
  data() {
    return {
      cart: []
    }
  },
  computed: {
    totalCost() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    }
  },
  mounted() {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      this.$router.push({ name: 'login' })
    } else {
      const userId = jwtDecode(jwt).userId
      this.cart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || []
    }
  },
  methods: {
    updateQuantity(item, quantity) {
      item.quantity = quantity
      localStorage.setItem(`cart-${jwtDecode(localStorage.getItem('jwt')).userId}`, JSON.stringify(this.cart))
      cartItemCount.value = this.cart.length; 
    },
    removeItem(item) {
      this.cart = this.cart.filter(i => i.id !== item.id)
      localStorage.setItem(`cart-${jwtDecode(localStorage.getItem('jwt')).userId}`, JSON.stringify(this.cart))
      cartItemCount.value = this.cart.length; // Update cartItemCount state
    },
    clearCart() {
      this.cart = []
      localStorage.removeItem(`cart-${jwtDecode(localStorage.getItem('jwt')).userId}`)
      cartItemCount.value = 0; // Update cartItemCount state
    }
  }
}
</script>