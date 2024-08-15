<!-- src/components/DiscountedProductDetail.vue -->
<template>
    <div v-if="product" class="discounted-product-detail">
      <h2>{{ product.title }}</h2>
      <img :src="product.image" :alt="product.title">
      <p class="price">
        <span class="discounted-price">${{ product.discountedPrice.toFixed(2) }}</span>
        <span class="original-price">${{ product.originalPrice.toFixed(2) }}</span>
      </p>
      <p class="discount-percentage">{{ product.discountPercentage }}% OFF</p>
      <p class="sale-end-date">Sale ends on: {{ formatDate(product.saleEndDate) }}</p>
      <p>{{ product.description }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'DiscountedProductDetail',
    setup() {
      const store = useStore();
      const route = useRoute();
  
      const product = computed(() => {
        return store.state.discountedProducts.find(p => p.id === parseInt(route.params.id));
      });
  
      function addToCart(product) {
        store.dispatch('addToCart', product);
      }
  
      function formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
  
      return {
        product,
        addToCart,
        formatDate
      };
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>