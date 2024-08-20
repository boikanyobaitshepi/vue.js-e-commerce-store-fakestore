<template>
  <div class="wishlist">
    <h1>My Wishlist</h1>
    <div class="wishlist-grid">
      <div v-for="product in wishlist" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title">
        <h3>{{ product.title }}</h3>
        <p>{{ product.category }}</p>
        <p>${{ product.price.toFixed(2) }}</p>
        <button @click="removeFromWishlist(product)" class="remove-from-wishlist-btn">
          <span class="btn-text">Remove from Wishlist</span>
          <span class="btn-icon">&#10006;</span>
        </button>
      </div>
    </div>
    <button @click="addWishlistToCart" class="add-wishlist-to-cart-btn">
      <span class="btn-text">Add all to Cart</span>
      <span class="btn-icon">&#128722;</span>
    </button>
    <button @click="clearWishlist" class="clear-wishlist-btn">
      <span class="btn-text">Clear Wishlist</span>
      <span class="btn-icon">&#10006;</span>
    </button>
  </div>
</template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
  
      const wishlistItems = computed(() => store.state.wishlistItems);
  
      function addToCart(item) {
        store.dispatch('addToCart', item);
      }
  
      function removeFromWishlist(itemId) {
        store.dispatch('removeFromWishlist', itemId);
      }
  
      return {
        wishlistItems,
        addToCart,
        removeFromWishlist,
      };
    }
  }
  </script>
  
  <style scoped>
  .wishlist {
    padding: 20px;
  }
  
  .wishlist-item {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  
  .wishlist-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 20px;
  }
  </style>