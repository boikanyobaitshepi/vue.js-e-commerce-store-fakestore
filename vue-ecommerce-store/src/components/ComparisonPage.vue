<!-- ComparisonPage.vue -->
<template>
    <div class="comparison-page">
      <h1>Product Comparison</h1>
      <table v-if="comparisonList.length">0">
        <tr>
          <th>Image</th>
          <td v-for="product in comparisonList" :key="product.id">
            <img :src="product.image" :alt="product.title" />
            <button @click="removeFromComparison(product.id)" class="remove-btn">Remove</button>
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
        <!-- <tr>
          <th>Actions</th>
          <td v-for="product in comparisonList" :key="product.id">
            <button @click="removeFromComparison(product.id)">Remove</button>
          </td>
        </tr> -->
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
.comparison {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

img {
  max-width: 100px;
  max-height: 100px;
}

.remove-btn, .clear-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 5px;
}

.clear-btn {
  background-color: #ff9800;
  margin-top: 20px;
}
</style>