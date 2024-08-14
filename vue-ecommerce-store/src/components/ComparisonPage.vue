<!-- ComparisonPage.vue -->
<template>
    <div class="comparison-page">
      <h1>Product Comparison</h1>
      <table v-if="comparisonList.length">
        <tr>
          <th>Image</th>
          <td v-for="product in comparisonList" :key="product.id">
            <img :src="product.image" :alt="product.title" />
          </td>
        </tr>
        <tr>
          <th>Title</th>
          <td v-for="product in comparisonList" :key="product.id">{{ product.title }}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td v-for="product in comparisonList" :key="product.id">{{ product.description }}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td v-for="product in comparisonList" :key="product.id">${{ product.price.toFixed(2) }}</td>
        </tr>
        <tr>
          <th>Rating</th>
          <td v-for="product in comparisonList" :key="product.id">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</td>
        </tr>
        <tr>
          <th>Actions</th>
          <td v-for="product in comparisonList" :key="product.id">
            <button @click="removeFromComparison(product.id)">Remove</button>
          </td>
        </tr>
      </table>
      <div v-else>No products in comparison list.</div>
      <button @click="clearComparison">Clear Comparison</button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
  
      const comparisonList = computed(() => store.getters.comparisonList);
  
      const removeFromComparison = (productId) => {
        store.dispatch('removeFromComparison', productId);
      };
  
      const clearComparison = () => {
        store.dispatch('clearComparison');
      };
  
      return {
        comparisonList,
        removeFromComparison,
        clearComparison,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>