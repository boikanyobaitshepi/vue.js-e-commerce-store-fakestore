// store/index.js
import { createStore } from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)
export default createStore({
  state: {
    // Auth
    isLoggedIn: false,
    user: null,
    // Cart
    cartItems: [],
    // Products
    products: [],
    discountedProducts: [],
    categories: [],
    wishlistItems: [],
    loading: false,
    error: null,
    user: null,
    theme: 'light',
    comparisonlist: [],
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
    ADD_TO_CART(state, { userId, product }) {
      if (!state.cart[userId]) {
        Vue.set(state.cart, userId, [])
      }
      const existingProduct = state.cart[userId].find(item => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.cart[userId].push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REMOVE_FROM_CART(state, { userId, productId }) {
      state.cart[userId] = state.cart[userId].filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    UPDATE_CART_ITEM_QUANTITY(state, { userId, productId, quantity }) {
      const item = state.cart[userId].find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    CLEAR_CART(state, userId) {
      Vue.set(state.cart, userId, [])
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    LOAD_CART(state) {
      const cart = localStorage.getItem('cart')
      if (cart) {
        state.cart = JSON.parse(cart)
      }
    },
    ADD_TO_COMPARISON(state, product) {
      if (state.comparisonList.length < 4 && !state.comparisonList.some(item => item.id === product.id)) {
        state.comparisonList.push(product)
      }
    },
    REMOVE_FROM_COMPARISON(state, productId) {
      state.comparisonList = state.comparisonList.filter(item => item.id !== productId)
    },
    CLEAR_COMPARISON(state) {
      state.comparisonList = []
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
      // SET_USER(state, user) {
      //   state.user = user;
      // },
      setTheme(state, theme) {
        state.theme = theme
        localStorage.setItem('theme', theme)
        document.body.setAttribute('data-theme', theme)
      },
    
      SET_PRODUCTS(state, products) {
        state.products = products;
      },
      SET_DISCOUNTED_PRODUCTS(state, discountedProducts) {
        state.discountedProducts = discountedProducts;
      },
      RESET_FILTERS(state) {
        state.selectedCategory = '';
        state.sortBy = 'default';
        state.searchQuery = '';
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
    // async signup({ commit }, userData) {
    //   try {

    //     await new Promise(resolve => setTimeout(resolve, 1000))
    //     commit('SET_LOGGED_IN', true)
    //     commit('SET_USER', { username: userData.username })
    //     return { message: 'Signup successful' }
    //   } catch (error) {
    //     commit('SET_ERROR', error.message)
    //     throw error
    //   }
    // },
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
    applyDiscounts({ commit, state }) {
      const allProducts = [...state.products];
      const discountedProducts = [];
      
      for (let i = 0; i < 5; i++) {
        if (allProducts.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        const product = allProducts.splice(randomIndex, 1)[0];
        
        const discountPercentage = Math.floor(Math.random() * 50) + 10; // 10% to 60% discount
        const discountedPrice = product.price * (1 - discountPercentage / 100);
        
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 14) + 1); // Sale ends in 1 to 14 days
        
        discountedProducts.push({
          ...product,
          discountPercentage,
          discountedPrice,
          originalPrice: product.price,
          saleEndDate: endDate
        });
      }
      
      commit('SET_DISCOUNTED_PRODUCTS', discountedProducts);
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
      // async login({ commit }, credentials) {
      //   try {
      //     await new Promise(resolve => setTimeout(resolve, 1000));
      //     const user = {
      //       id: Date.now(),
      //       username: credentials.username,
      //     };
      //     commit('SET_USER', user);
      //     localStorage.setItem('user', JSON.stringify(user));
      //     return user;
      //   } catch (error) {
      //     console.error('Login failed:', error);
      //     throw error;
      //   }
      
      logout({ commit }) {
        commit('SET_USER', null);
        localStorage.removeItem('user');
      },
      initTheme({ commit }) {
        const theme = localStorage.getItem('theme') || 'light'
        commit('setTheme', theme)
      },
      toggleTheme({ commit, state }) {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        commit('setTheme', newTheme)
      },
      resetFilters({ commit }) {
        commit('RESET_FILTERS');
      },
      login({ commit }, token) {
        const user = jwtDecode(token)
        commit('SET_USER', user)
        localStorage.setItem('token', token)
      },
      logout({ commit }) {
        commit('SET_USER', null)
        commit('CLEAR_CART', null)
        localStorage.removeItem('token')
      },
      addToCart({ commit, state }, product) {
        if (state.user) {
          commit('ADD_TO_CART', { userId: state.user.id, product })
        }
      },
      removeFromCart({ commit, state }, productId) {
        if (state.user) {
          commit('REMOVE_FROM_CART', { userId: state.user.id, productId })
        }
      },
      updateCartItemQuantity({ commit, state }, { productId, quantity }) {
        if (state.user) {
          commit('UPDATE_CART_ITEM_QUANTITY', { userId: state.user.id, productId, quantity })
        }
      },
      clearCart({ commit, state }) {
        if (state.user) {
          commit('CLEAR_CART', state.user.id)
        }
      },
      loadCart({ commit }) {
        commit('LOAD_CART')
      },
      addToComparison({ commit }, product) {
        commit('ADD_TO_COMPARISON', product)
      },
      removeFromComparison({ commit }, productId) {
        commit('REMOVE_FROM_COMPARISON', productId)
      },
      clearComparison({ commit }) {
        commit('CLEAR_COMPARISON')
      }, 
      
  },
  getters: {
    // getProductById: (state) => (id) => {
    //   return state.products.find(product => product.id === id)
    // },
    cartItemCount: (state) => {
      return state.cartItems.length
    },
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + item.price, 0)
    },
    wishlistItemCount: (state) => {
        return state.wishlistItems.length;
      },
      isLightTheme: state => state.theme === 'light',
      isLoggedIn: state => !!state.user,
    cartItems: state => state.user ? state.cart[state.user.id] || [] : [],
    cartTotal: (state, getters) => {
      return getters.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    cartItemCount: (state, getters) => {
      return getters.cartItems.reduce((count, item) => count + item.quantity, 0)
    },
    comparisonList: state => state.comparisonList
  
  }
})