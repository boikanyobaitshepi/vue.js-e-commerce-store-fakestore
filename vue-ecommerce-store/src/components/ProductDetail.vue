<template>
  <div v-if="product" class="product-detail">
    <h2>{{ product.title }}</h2>
    <img :src="product.image" :alt="product.title" class="product-image">
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price.toFixed(2) }}</p>
    <p>Category: {{ product.category }}</p>
    <p v-if="product.rating">Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
    <router-link to="/" class="back-btn">Back to Products</router-link>
  </div>
</template>

<script>
import axios from 'axios';

/**
 * The ProductDetail component for displaying the details of a product.
 *
 * @component
 */
export default {
  name: 'ProductDetail',
  data() {
    return {
      /**
       * The current product being displayed.
       * @type {Object|null}
       */
      product: null
    }
  },
  created() {
    this.fetchProduct();
  },
  methods: {
     /**
     * Fetches the product data from the FakeStoreAPI based on the current route parameters.
     *
     * @async
     * @function
     * @returns {void}
     */
    async fetchProduct() {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${this.$route.params.id}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  }
}

</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.product-image {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}
.back-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>