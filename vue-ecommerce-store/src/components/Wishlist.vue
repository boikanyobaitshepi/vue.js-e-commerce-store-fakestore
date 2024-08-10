<template>
    <div class="wishlist">
      <h1>Wishlist</h1>
      <div v-if="wishlistItems.length === 0">
        Your wishlist is empty.
      </div>
      <div v-else>
        <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
          <img :src="item.image" :alt="item.title">
          <div>
            <h3>{{ item.title }}</h3>
            <p>Price: ${{ item.price.toFixed(2) }}</p>
            <button @click="addToCart(item)">Add to Cart</button>
            <button @click="removeFromWishlist(item.id)">Remove from Wishlist</button>
          </div>
        </div>
      </div>
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