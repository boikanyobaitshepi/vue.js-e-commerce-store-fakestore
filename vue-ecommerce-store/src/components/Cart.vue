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
          <p>Quantity: 
            <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity === 1">-</button>
            {{ item.quantity }}
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </p>
          <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
        </div>
          <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>
      <div class="cart-total">
        <h3>Total: ${{ cartTotal.toFixed(2) }}</h3>
        <button @click="clearCart" class="clear-btn">Clear Cart</button>
        <button @click="checkout" class="checkout-btn">Checkout</button>
      </div>
    </div>
    <button @click="addToCart" class="add-to-cart-btn">
      <span class="btn-text">Add to Cart</span>
      <span class="btn-icon">🛒</span>
    </button>
  <!-- </div> -->
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const cartItems = computed(() => store.getters.cartItems);
    const cartTotal = computed(() => store.getters.cartTotal);

    function removeFromCart(itemId) {
      store.dispatch('removeFromCart', itemId);
    }
    function updateQuantity(itemId, quantity) {
      if (quantity > 0) {
        store.dispatch('updateCartItemQuantity', { productId: itemId, quantity });
      }
    }

    function checkout() {
      console.log('Checkout');
      this.$router.push({ name: 'Checkout' });
    }
    function clearCart() {
      store.dispatch('clearCart');
    }
    function checkout() {
      console.log('Checkout');
      router.push({ name: 'Checkout' });
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
      updateQuantity,
      clearCart,
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
.clear-btn {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
}
</style>