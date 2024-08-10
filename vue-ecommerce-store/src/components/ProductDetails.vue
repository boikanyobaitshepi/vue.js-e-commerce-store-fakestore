<template>
    <div v-if="product" class="product-detail">
      <img :src="product.image" :alt="product.title">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price.toFixed(2) }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
      <button @click="addToCart(product)">Add to Cart</button>
      <button @click="addToWishlist(product)">Add to Wishlist</button>
    </div>
    <div v-else>
      Loading...
    </div>
    <div class="reviews">
      <h2>Reviews</h2>
      <div v-if="product.reviews && product.reviews.length">
        <div v-for="review in product.reviews" :key="review.id" class="review">
          <p><strong>{{ review.user }}</strong> - {{ review.date }}</p>
          <p>Rating: {{ review.rating }}/5</p>
          <p>{{ review.comment }}</p>
        </div>
      </div>
      <div v-else>No reviews yet.</div>
      <h3>Add a Review</h3>
      <form @submit.prevent="submitReview">
        <input v-model="newReview.rating" type="number" min="1" max="5" placeholder="Rating (1-5)" required>
        <textarea v-model="newReview.comment" placeholder="Your review" required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  


  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const route = useRoute();
  
      const productId = computed(() => parseInt(route.params.id));
      const product = computed(() => store.getters.getProductById(productId.value));
  
      function addToCart(product) {
        store.dispatch('addToCart', product);
      }
  
      function addToWishlist(product) {
        // Implement wishlist functionality
        console.log('Add to wishlist:', product);
      }
  
      return {
        product,
        addToCart,
        addToWishlist,
      };
    }
  }
  </script>
  
  <style scoped>
  .product-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .product-detail img {
    max-width: 300px;
    height: auto;
  }
  </style>