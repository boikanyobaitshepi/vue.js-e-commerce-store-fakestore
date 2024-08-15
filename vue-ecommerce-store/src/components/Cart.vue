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
          <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>
      <div class="cart-total">
        <h3>Total: ${{ cartTotal.toFixed(2) }}</h3>
        <button @click="checkout" class="checkout-btn">Checkout</button>
      </div>
    </div>
    <button @click="addToCart" class="add-to-cart-btn">
      <span class="btn-text">Add to Cart</span>
      <span class="btn-icon">🛒</span>
    </button>
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
      console.log('Checkout');
      this.$router.push({ name: 'Checkout' });
    }

    function addToCart() {
      // Implement add to cart functionality
      console.log('Add to Cart');
    }

    return {
      cartItems,
      cartTotal,
      removeFromCart,
      checkout,
      addToCart,
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

.remove-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.checkout-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.add-to-cart-btn {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 50px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.add-to-cart-btn:hover {
  transform: scale(1.05);
}

.btn-text {
  margin-right: 10px;
}

.btn-icon {
  font-size: 24px;
}
</style>