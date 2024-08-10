// store/index.js
import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    // Auth
    isLoggedIn: false,
    user: null,
    // Cart
    cartItems: [],
    // Products
    products: [],
    categories: [],
    wishlistItems: [],
    loading: false,
    error: null
  },
  mutations: {
    // Auth mutations
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value
    },
    SET_USER(state, user) {
      state.user = user
    },
    // Cart mutations
    ADD_TO_CART(state, item) {
      state.cartItems.push(item)
    },
    REMOVE_FROM_CART(state, itemId) {
      state.cartItems = state.cartItems.filter(item => item.id !== itemId)
    },
    // Product mutations
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_TO_WISHLIST(state, item) {
        if (!state.wishlistItems.some(i => i.id === item.id)) {
          state.wishlistItems.push(item);
        }
      },
      REMOVE_FROM_WISHLIST(state, itemId) {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== itemId);
      },
      UPDATE_PRODUCT(state, updatedProduct) {
        const index = state.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      },
    
  },
  actions: {
    // Auth actions
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', credentials)
        commit('SET_LOGGED_IN', true)
        commit('SET_USER', { username: credentials.username, token: response.data.token })
        return response.data
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      }
    },
    async signup({ commit }, userData) {
      try {
        // Note: Fake Store API doesn't have a real signup endpoint, so we're simulating it
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        commit('SET_LOGGED_IN', true)
        commit('SET_USER', { username: userData.username })
        return { message: 'Signup successful' }
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      }
    },
    logout({ commit }) {
      commit('SET_LOGGED_IN', false)
      commit('SET_USER', null)
    },
    // Cart actions
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
    },
    removeFromCart({ commit }, itemId) {
      commit('REMOVE_FROM_CART', itemId)
    },
    // Product actions
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      }
      commit('SET_LOADING', false)
    },
    async fetchCategories({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories')
        commit('SET_CATEGORIES', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message)
      }
      commit('SET_LOADING', false)
    },
    addToWishlist({ commit }, item) {
        commit('ADD_TO_WISHLIST', item);
      },
      removeFromWishlist({ commit }, itemId) {
        commit('REMOVE_FROM_WISHLIST', itemId);
      },
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    cartItemCount: (state) => {
      return state.cartItems.length
    },
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + item.price, 0)
    },
    wishlistItemCount: (state) => {
        return state.wishlistItems.length;
      },
  }
})