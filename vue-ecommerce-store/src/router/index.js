import { createRouter, createWebHistory } from 'vue-router'
import Cart from '../components/Cart.vue'
import ProductDetails from '../components/ProductDetail.vue'
import Wishlist from '../components/Wishlist.vue'
import Checkout from '../components/Checkout.vue'
import ProductList from '../components/ProductList.vue'
import Login from '../components/Login.vue'
import ComparisonPage from '../components/ComparisonPage.vue'
import DiscountedProductDetail from '../components/DiscountedProductDetail.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import store from '../store'


const routes = [
  {
    path: '/',
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
    component: Cart,
    meta: { requiresAuth: true }
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/themetoggle',
    name: 'ThemeToggle',
    component: ThemeToggle
  },



  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: ComparisonPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/discounted-product/:id',
    name: 'DiscountedProductDetail',
    component: DiscountedProductDetail
  },

]

const router = createRouter({
  history: createWebHistory('process.env.BASE_URL'),
  routes
})
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn']
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})


export default router