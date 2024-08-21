<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <div v-if="cartItems.length === 0">
      Your cart is empty. Please add items before checking out.
    </div>
    <div v-else>
      <h2>Order Summary</h2>
      <div v-for="item in cartItems" :key="item.id" class="checkout-item">
        <span>{{ item.title }}</span>
        <span>${{ item.price.toFixed(2) }}</span>
      </div>
      <div class="total">
        <strong>Total: ${{ cartTotal.toFixed(2) }}</strong>
      </div>
      <form @submit.prevent="processOrder">
        <!-- ... (rest of the form remains the same) ... -->
        <button type="submit" :disabled="isProcessing">
          {{ isProcessing ? 'Processing...' : 'Place Order' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
/**
 * A Vue.js component that represents the checkout page for a shopping cart.
 * @component
 */
export default {
  name: 'Checkout',
  setup() {
    const store = useStore();
    const router = useRouter();
  
     /**
     * The items in the user's shopping cart.
     * @type {Object[]}
     * @property {number} id - The unique identifier of the item.
     * @property {string} title - The title of the item.
     * @property {number} price - The price of the item.
     */
    const cartItems = computed(() => store.state.cart.items);
    const cartTotal = computed(() => store.getters['cart/total']);

    const shippingInfo = ref({
      name: '',
      address: '',
      city: '',
      zipCode: '',
    });
    /**
     * The user's shipping information.
     * @type {Object}
     * @property {string} name - The name of the recipient.
     * @property {string} address - The address of the recipient.
     * @property {string} city - The city of the recipient.
     * @property {string} zipCode - The zip code of the recipient.
     */
    const paymentInfo = ref({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });

    const paymentMethod = ref('credit-card');
    const isProcessing = ref(false);

    async function processOrder() {
      isProcessing.value = true;
      try {
        if (paymentMethod.value === 'paypal') {
          await initiatePayPalPayment();
        } else {
          // Process credit card payment
          console.log('Processing credit card payment', {
            items: cartItems.value,
            total: cartTotal.value,
            shipping: shippingInfo.value,
            payment: paymentInfo.value,
          });

          // Clear the cart
          await store.dispatch('cart/clearCart');

          // Redirect to a confirmation page
          router.push('/order-confirmation');
        }
      } catch (error) {
        console.error('Error processing order:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        isProcessing.value = false;
      }
    }

    async function initiatePayPalPayment() {
      try {
        // Call your backend API to create a PayPal order
        const response = await fetch('/api/create-paypal-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cartItems.value,
            total: cartTotal.value,
            shipping: shippingInfo.value,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create PayPal order');
        }

        const { orderID } = await response.json();

        // Redirect to PayPal checkout
        window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
      } catch (error) {
        console.error('Failed to initiate PayPal payment', error);
        // Handle error (e.g., show error message to user)
      }
    }

    return {
      cartItems,
      cartTotal,
      shippingInfo,
      paymentInfo,
      paymentMethod,
      processOrder,
      isProcessing,
    };
  }
}
</script>

<style scoped>
.checkout {
  padding: 20px;
}

.checkout-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.total {
  margin-top: 20px;
  text-align: right;
}

form {
  margin-top: 20px;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

button {
  margin-top: 20px;
}
</style>