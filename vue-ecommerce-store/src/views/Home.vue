<template>
  <div class="home">
    
    <h1>Our Products</h1>
    <filter-component />
    <!-- <sort-component /> -->
    <product-grid />
    <!-- </div> -->
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductGrid from '../components/ProductGrid.vue'
import FilterComponent from '../components/FilterComponent.vue'
// import SortComponent from '../components/SortComponent.vue'


export default {
    
  data() {
    return {
      isLoading: true,


    }
  },
  methods: {
    async fetchShopData() {
      // this.isLoading = true
      this.loadingText = 'Loading shop data...'
      try {
        const response = await fetch('your-shop-api-endpoint')
        this.shopData = await response.json()
      } catch (error) {
        console.error('Error fetching shop data:', error)
      } finally {
        // this.isLoading = false
      }
    },
    async fetchProductData(productId) {
      // this.isLoading = true
      this.loadingText = 'Loading product data...'
      try {
        const response = await fetch(`your-product-api-endpoint/${productId}`)
        this.currentProduct = await response.json()
      } catch (error) {
        console.error('Error fetching product data:', error)
      } finally {
        // this.isLoading = false
      }
    }
  },
  async created() {
    await this.fetchShopData()
  },


  name: 'Home',
  components: {
    ProductGrid,
    FilterComponent,
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('fetchProducts')
      store.dispatch('fetchCategories')
    })
  }
}
</script>