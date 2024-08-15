<template>
    <div class="cart">
      <h1>Shopping Cart</h1>
      <div v-if="cartItems.length === 0">
        Your cart is empty.
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title">
          <div>
            <h3>{{ item.title }}</h3>
            <p>Price: ${{ item.price.toFixed(2) }}</p>
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </div>
        <div class="cart-total">
          <h3>Total: ${{ cartTotal.toFixed(2) }}</h3>
          <button @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
  
      const cartItems = computed(() => store.state.cartItems);
      const cartTotal = computed(() => store.getters.cartTotal);
  
      function removeFromCart(itemId) {
        store.dispatch('removeFromCart', itemId);
      }
  
      function checkout() {
  // Implement checkout functionality
  console.log('Checkout');
  this.$router.push({ name: 'Checkout' });
}

  
      return {
        cartItems,
        cartTotal,
        removeFromCart,
        checkout,
      };
    }
  }
  </script>
  
  <style scoped>
  .cart {
    padding: 20px;
  }
  
  .cart-item {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  
  .cart-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 20px;
  }
  
  .cart-total {
    text-align: right;
  }
  </style>