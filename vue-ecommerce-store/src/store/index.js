import { createStore } from 'vuex'
import axios from 'axios'
import auth from './modules/auth'
import cart from './modules/cart'

export default createStore({
    modules: {
        auth,
        cart
      },
    
  state: {
    products: [],
    categories: [],
    loading: false,
    error: null
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true)
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        commit('setProducts', response.data)
      } catch (error) {
        commit('setError', error.message)
      }
      commit('setLoading', false)
    },
    async fetchCategories({ commit }) {
      commit('setLoading', true)
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories')
        commit('setCategories', response.data)
      } catch (error) {
        commit('setError', error.message)
      }
      commit('setLoading', false)
    }
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    }
  }
})