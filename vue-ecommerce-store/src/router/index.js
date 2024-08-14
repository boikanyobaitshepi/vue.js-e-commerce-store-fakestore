import { createRouter, createWebHistory } from 'vue-router'
import Cart from '../components/Cart.vue'
import ProductDetails from '../components/ProductDetail.vue'
import Wishlist from '../components/Wishlist.vue'
import Checkout from '../components/Checkout.vue'
import ProductList from '../components/ProductList.vue'
// import  Header from '../components/Header.vue'
import Login from '../components/Login.vue'
import PayPalCallback from '../components/PayPalCallback.vue'
import OrderConfirmation from '../components/OrderConfirmation.vue'
import PaymentCancelled from '../components/PaymentCancelled.vue'
import PaymentFailed from '../components/PaymentFailed.vue'
import ComparisonPage from '../components/ComparisonPage.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Header',
  //   component: Header

  // },
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

  { path: '/login', component: Login },
  { path: '/paypal-callback', component: PayPalCallback },
  { path: '/order-confirmation', component: OrderConfirmation },
  { path: '/payment-failed', component: PaymentFailed },
  { path: '/payment-cancelled', component: PaymentCancelled },
  {
    path: '/comparison',
    name: 'Comparison',
    component: ComparisonPage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({

  history: createWebHistory(''),
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login?redirect=' + to.path);
  }
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {

  next();
  }
})

export default router