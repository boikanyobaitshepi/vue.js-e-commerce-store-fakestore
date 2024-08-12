import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Cart from '../components/Cart.vue'
import ProductDetails from '../components/ProductDetails.vue'
import Wishlist from '../components/Wishlist.vue'
import Checkout from '../components/Checkout.vue'
import Register from '../components/Register.vue'
import ProductList from '../components/ProductList.vue'
import  Header from '../components/Header.vue'

const routes = [
  {
    path: '/',
    name: 'Header',
    component: Header

  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetails
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  // Use an empty string as the base URL if you're not using environment variables
  history: createWebHistory(''),
  routes
})

export default router