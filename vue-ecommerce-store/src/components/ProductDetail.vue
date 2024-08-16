<template>
    <div v-if="product" class="product-detail">
      <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Loading product details...</p>
    </div>
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
    <button @click="addToComparison" :disabled="isInComparison">
    {{ isInComparison ? 'In Comparison' : 'Add to Comparison' }}
  </button>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  
  export default {
    props: ['product'],
    setup(props) {
      const store = useStore();
      const route = useRoute();
      const isLoading= ref(true);

   
      const isInComparison = computed(() => 
      store.getters.comparisonList.some(item => item.id === props.product.id)
    );

    const addToComparison = () => {
      store.dispatch('addToComparison', props.product);
    };

      const productId = computed(() => parseInt(route.params.id));
      // const product = computed(() => store.getters.getProductById(productId.value));

      const newReview = ref({
      rating: null,
      comment: '',
      });
      function addToCart(product) {
        store.dispatch('addToCart', product);
      }
  
      function addToWishlist(product) {
        // Implement wishlist functionality
        console.log('Add to wishlist:', product);
      }
      function submitReview() {
      store.dispatch('submitReview', newReview.value);

      const review = {
        id: Date.now(), // Use a real ID in production
        user: 'Current User', // Use the actual logged-in user's name
        date: new Date().toLocaleDateString(),
        rating: newReview.value.rating,
        comment: newReview.value.comment,
      };

      // Add the review to the product
      if (!product.value.reviews) {
        product.value.reviews = [];
      }
      product.value.reviews.push(review);

      // Reset the form
      newReview.value = { rating: null, comment: '' };
      
      // Update the product in the store
      store.commit('UPDATE_PRODUCT', product.value);
      // Check for duplicate reviews
  const isDuplicate = product.value.reviews.some(
    existingReview => 
      existingReview.user === review.user && 
      existingReview.comment === review.comment
  );

  if (!isDuplicate) {
    product.value.reviews.push(review);
    // Update the product in the store
    store.commit('UPDATE_PRODUCT', product.value);
  } else {
    console.log('Duplicate review detected');
    // Optionally, show a message to the user
  }
    }

  
      return {
        product,
        addToCart,
        addToWishlist,
        newReview,
        submitReview,
        isLoading,

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
  .reviews {
  margin-top: 20px;
}

.review {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

form {
  margin-top: 20px;
}

input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

button {
  margin-top: 10px;
}
</style>