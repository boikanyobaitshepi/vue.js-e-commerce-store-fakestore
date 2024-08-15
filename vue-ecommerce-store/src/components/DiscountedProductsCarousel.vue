<!-- src/components/DiscountedProductsCarousel.vue -->
<template>
    <div class="discounted-products-carousel">
      <h2>Special Offers</h2>
      <div class="carousel">
        <div v-for="product in discountedProducts" :key="product.id" class="carousel-item">
          <img :src="product.image" :alt="product.title">
          <h3>{{ product.title }}</h3>
          <p class="price">
            <span class="discounted-price">${{ product.discountedPrice.toFixed(2) }}</span>
            <span class="original-price">${{ product.originalPrice.toFixed(2) }}</span>
          </p>
          <p class="discount-percentage">{{ product.discountPercentage }}% OFF</p>
          <router-link :to="{ name: 'DiscountedProductDetail', params: { id: product.id } }">
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'DiscountedProductsCarousel',
    setup() {
      const store = useStore();
      const discountedProducts = computed(() => store.state.discountedProducts);
  
      return {
        discountedProducts
      };
    }
  }
  </script>
  
  <style scoped>
  .discounted-products-carousel {
    /* Add your carousel styling here */
  }
  
  .carousel {
    display: flex;
    overflow-x: auto;
  }
  
  .carousel-item {
    flex: 0 0 auto;
    width: 200px;
    margin-right: 20px;
  }
  
  .original-price {
    text-decoration: line-through;
    color: #999;
  }
  
  .discounted-price {
    color: #e44d26;
    font-weight: bold;
  }
  
  .discount-percentage {
    background-color: #e44d26;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
  }
  </style>