<template>
  <div class="product-list">
    <h1>Products</h1>
    
    <!-- Search, filter, and sort controls -->
    <div class="controls">
      <input v-model="searchQuery" type="text" placeholder="Search products...">
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <select v-model="sortBy">
        <option value="default">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="loading">Loading products...</div>

    <!-- Error message -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Product grid -->
    <div v-if="!isLoading && !error" class="products-grid">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title">
        <h3>{{ product.title }}</h3>
        <p>${{ product.price.toFixed(2) }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!isLoading && !error" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const sortBy = ref('default');
    const currentPage = ref(1);
    const itemsPerPage = 12;
    const isLoading = ref(true);
    const error = ref(null);

    const products = computed(() => store.state.products);
    const categories = computed(() => store.state.categories);

    const filteredProducts = computed(() => {
      let result = products.value;
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }
      
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

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProducts.value.slice(start, end);
    });

    const totalPages = computed(() => 
      Math.ceil(filteredProducts.value.length / itemsPerPage)
    );

    function prevPage() {
      if (currentPage.value > 1) currentPage.value--;
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) currentPage.value++;
    }

    function addToCart(product) {
      store.dispatch('addToCart', product);
    }

    onMounted(async () => {
      try {
        isLoading.value = true;
        await store.dispatch('fetchProducts');
        await store.dispatch('fetchCategories');
      } catch (err) {
        error.value = 'Failed to load products. Please try again later.';
      } finally {
        isLoading.value = false;
      }
    });

    return {
      searchQuery,
      selectedCategory,
      sortBy,
      currentPage,
      categories,
      filteredProducts,
      paginatedProducts,
      totalPages,
      isLoading,
      error,
      prevPage,
      nextPage,
      addToCart
    };
  }
}
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.controls input,
.controls select {
  padding: 5px;
}

.loading,
.error {
  text-align: center;
  margin: 20px 0;
}

.error {
  color: red;
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

/* Responsive design */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
  }

  .controls input,
  .controls select {
    width: 100%;
    margin-bottom: 10px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>