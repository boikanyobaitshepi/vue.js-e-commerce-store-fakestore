<template>
    <div class="product-list">
      <h1>Products</h1>
      <div class="filters">
        <select v-model="selectedCategory" @change="filterProducts">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select v-model="sortBy" @change="sortProducts">
          <option value="default">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.title">
          <h3>{{ product.title }}</h3>
          <p>{{ product.price.toFixed(2) }}</p>
          <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">View Details</router-link>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const selectedCategory = ref('');
      const sortBy = ref('default');
  
      const products = computed(() => store.state.products);
      const categories = computed(() => store.state.categories);
  
      const filteredProducts = computed(() => {
        let result = products.value;
        if (selectedCategory.value) {
          result = result.filter(p => p.category === selectedCategory.value);
        }
        if (sortBy.value === 'price_asc') {
          result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy.value === 'price_desc') {
          result = [...result].sort((a, b) => b.price - a.price);
        }
        return result;
      });
  
      function filterProducts() {
        // This function is called when the category changes
        // The filtering is handled by the computed property
      }
  
      function sortProducts() {
        // This function is called when the sort order changes
        // The sorting is handled by the computed property
      }
  
      function addToCart(product) {
        store.dispatch('addToCart', product);
      }
  
      onMounted(() => {
        store.dispatch('fetchProducts');
        store.dispatch('fetchCategories');
      });
  
      return {
        selectedCategory,
        sortBy,
        categories,
        filteredProducts,
        filterProducts,
        sortProducts,
        addToCart,
      };
    }
  }
  </script>
  
  <style scoped>
  .product-list {
    padding: 20px;
  }
  
  .filters {
    margin-bottom: 20px;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .product-card {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .product-card img {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
  }
  </style>