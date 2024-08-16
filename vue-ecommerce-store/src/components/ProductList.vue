<template>
    <div class="product-list">
      <h1>Our Products</h1>
      <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
      <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="Search products...">
    </div>
      <div class="filters">
        <select v-model="selectedCategory" @change="filteredProducts">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select v-model="sortBy" @change="resetPage">
          <option value="default">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <div class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title">
        <h3>{{ product.title }}</h3>
        <p>{{ product.category }}</p>
        <p>${{ product.price.toFixed(2) }}</p>
        <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">View Details</router-link>
        <button @click="addToCart(product)" class="add-to-cart-btn">
          <span class="btn-text">Add to Cart</span>
          <span class="btn-icon">🛒</span>
        </button>
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
    const searchQuery = ref('');
    const isLoading = ref(true);

    const products = computed(() => store.state.products);
    const categories = computed(() => store.state.categories);

    const filteredProducts = computed(() => {
      let result = products.value;
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }
      
      // Apply category filter
      if (selectedCategory.value) {
        result = result.filter(p => p.category === selectedCategory.value);
      }
      
      // Apply sorting
      if (sortBy.value === 'price_asc') {
        result = [...result].sort((a, b) => a.price - b.price);
      } else if (sortBy.value === 'price_desc') {
        result = [...result].sort((a, b) => b.price - a.price);
      }
      
      return result;
    });

    function addToCart(product) {
      store.dispatch('addToCart', product);
    }

    // onMounted(() => {
    //   store.dispatch('fetchProducts');
    //   store.dispatch('fetchCategories');
    // });
    onMounted(async () => {
      try {
        await Promise.all([
          store.dispatch('fetchProducts'),
          store.dispatch('fetchCategories')
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        isLoading.value = false;
      }
    });

    return {
      selectedCategory,
      sortBy,
      categories,
      filteredProducts,
      addToCart,
      searchQuery,
      isLoading,
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
}
.add-to-cart-btn {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 25px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 100%;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-text {
  margin-right: 5px;
}

.btn-icon {
  font-size: 18px;
}

/* Adjust product card layout */
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-card img {
  max-width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

.product-card h3 {
  margin-bottom: 5px;
  font-size: 16px;
}

.product-card p {
  margin-bottom: 10px;
  font-weight: bold;
  color: #e44d26;
}

.product-card a {
  margin-bottom: 10px;
  text-decoration: none;
  color: #4CAF50;
  font-weight: bold;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>