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

/**
 * A Vue.js component that displays the details of a discounted product.
 * @component
 */
export default {
  name: 'DiscountedProductDetail',
  setup() {
    const store = useStore();
    const route = useRoute();

    /**
     * The discounted product being displayed.
     * @type {Object}
     * @property {number} id - The unique identifier of the product.
     * @property {string} title - The title of the product.
     * @property {string} image - The URL of the product image.
     * @property {string} description - The description of the product.
     * @property {number} originalPrice - The original price of the product.
     * @property {number} discountedPrice - The discounted price of the product.
     * @property {number} discountPercentage - The percentage of the discount.
     * @property {Date} saleEndDate - The date when the sale ends.
     */
    const product = computed(() => {
      return store.state.discountedProducts.find(p => p.id === parseInt(route.params.id));
    });

    /**
     * Adds the specified product to the cart.
     * @param {Object} product - The product to be added to the cart.
     */
    function addToCart(product) {
      store.dispatch('addToCart', product);
    }

    /**
     * Formats a date as a string.
     * @param {Date} date - The date to be formatted.
     * @returns {string} The formatted date.
     */
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

