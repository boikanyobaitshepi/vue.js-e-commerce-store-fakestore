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
        <h2>Shipping Information</h2>
        <input v-model="shippingInfo.name" placeholder="Full Name" required>
        <input v-model="shippingInfo.address" placeholder="Address" required>
        <input v-model="shippingInfo.city" placeholder="City" required>
        <input v-model="shippingInfo.zipCode" placeholder="Zip Code" required>
        <h2>Payment Method</h2>
        <div>
          <input type="radio" id="credit-card" value="credit-card" v-model="paymentMethod">
          <label for="credit-card">Credit Card</label>
        </div>
        <div>
          <input type="radio" id="paypal" value="paypal" v-model="paymentMethod">
          <label for="paypal">PayPal</label>
        </div>
        <div v-if="paymentMethod === 'credit-card'">
          <h3>Credit Card Information</h3>
          <input v-model="paymentInfo.cardNumber" placeholder="Card Number" required>
          <input v-model="paymentInfo.expiryDate" placeholder="MM/YY" required>
          <input v-model="paymentInfo.cvv" placeholder="CVV" required>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const cartItems = computed(() => store.state.cartItems);
    const cartTotal = computed(() => store.getters.cartTotal);

    const shippingInfo = ref({
      name: '',
      address: '',
      city: '',
      zipCode: '',
    });

    const paymentInfo = ref({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });

    const paymentMethod = ref('credit-card');

    async function processOrder() {
      if (paymentMethod.value === 'paypal') {
        // Redirect to PayPal
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
        cartItems.value.forEach(item => store.dispatch('removeFromCart', item.id));

        // Redirect to a confirmation page
        router.push('/order-confirmation');
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