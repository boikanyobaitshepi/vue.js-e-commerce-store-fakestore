<template>
  <div class="comparison-list">
    <h1>Comparison List</h1>
    <table>
      <tr>
        <th>Product Title</th>
        <th>Product Image</th>
        <th>Product Description</th>
        <th>Product Price</th>
        <th>Product Rating</th>
        <th>Actions</th>
      </tr>
      <tr v-for="item in comparisonList" :key="item.id">
        <td>{{ item.title }}</td>
        <td><img :src="item.image" alt="Product Image" /></td>
        <td>{{ item.description }}</td>
        <td>{{ formatCurrency(item.price) }}</td>
        <td>{{ item.rating }}</td>
        <td>
          <button @click="removeItem(item)">Remove</button>
        </td>
      </tr>
    </table>
    <button @click="clearComparisonList" :disabled="comparisonList.length === 0">
      Clear Comparison List
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

/**
 * A Vue.js component that displays a list of products for comparison.
 * @component
 */
export default {
  name: 'ComparisonList',
  setup() {
    /**
     * The list of products for comparison.
     * @type {Object[]}
     * @property {number} id - The unique identifier of the product.
     * @property {string} title - The title of the product.
     * @property {string} image - The URL of the product image.
     * @property {string} description - The description of the product.
     * @property {number} price - The price of the product.
     * @property {number} rating - The rating of the product.
     */
    const comparisonList = ref([]);

    /**
     * Removes an item from the comparison list.
     * @param {Object} item - The item to be removed from the comparison list.
     */
    function removeItem(item) {
      comparisonList.value = comparisonList.value.filter((i) => i.id !== item.id);
    }

    /**
     * Clears the comparison list.
     */
    function clearComparisonList() {
      comparisonList.value = [];
    }

    /**
     * Formats a number as a currency value.
     * @param {number} value - The number to be formatted.
     * @returns {string} The formatted currency value.
     */
    function formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    }

    return {
      comparisonList,
      removeItem,
      clearComparisonList,
      formatCurrency,
    };
  },
};
</script>

<style scoped>
.comparison-list {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

img {
  max-width: 100px;
  height: auto;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>