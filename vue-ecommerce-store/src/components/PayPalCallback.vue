<template>
    <div>
      <h1>Processing PayPal Payment</h1>
      <p>Please wait while we verify your payment...</p>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const router = useRouter();
      const store = useStore();
  
      onMounted(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        const payerId = urlParams.get('PayerID');
  
        if (paymentId && payerId) {
          try {
            // Call your backend API to execute the PayPal payment
            const response = await fetch('/api/execute-paypal-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ paymentId, payerId }),
            });
  
            const result = await response.json();
  
            if (result.success) {
              // Clear the cart
              store.dispatch('clearCart');
  
              // Redirect to confirmation page
              router.push('/order-confirmation');
            } else {
              // Payment failed
              router.push('/payment-failed');
            }
          } catch (error) {
            console.error('Failed to execute PayPal payment', error);
            router.push('/payment-failed');
          }
        } else if (urlParams.get('token')) {
          // Payment was cancelled
          router.push('/payment-cancelled');
        } else {
          // Invalid callback
          router.push('/payment-failed');
        }
      });
  
      return {};
    }
  }
  </script>