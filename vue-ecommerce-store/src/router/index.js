import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductView from '../views/ProductView.vue'
import Login from '../views/Login.vue'
import Cart from '../components/Cart.vue'
import ProductDetails from '../components/ProductDetails.vue'
import Wishlist from '../components/Wishlist.vue'
import Checkout from '../components/Checkout.vue'
import Register from '../components/Register.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router