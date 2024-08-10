<template>
    <header
      @mousemove="onMousemove"
      :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
    >
      <nav>
        <ul>
          <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
          <li><router-link to="/products"><i class="fas fa-store"></i> Products</router-link></li>
          <li><router-link to="/cart"><i class="fas fa-shopping-cart"></i> Cart ({{ cartItemCount }})</router-link></li>
          <li><router-link to="/wishlist"><i class="fas fa-heart"></i> Wishlist</router-link></li>
          <li v-if="!isLoggedIn">
            <a href="#" @click.prevent="showModal = 'login'">
              <i class="fas fa-sign-in-alt"></i> Login
            </a>
          </li>
          <li v-if="!isLoggedIn">
            <a href="#" @click.prevent="showModal = 'signup'">
              <i class="fas fa-user-plus"></i> Sign Up
            </a>
          </li>
          <li v-else>
            <a href="#" @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  
    <main>
      <router-view></router-view>
    </main>
  
    <div v-if="showModal === 'login'" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = null">&times;</span>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input v-model="loginForm.username" type="text" placeholder="Username" required>
          <input v-model="loginForm.password" type="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  
    <div v-else-if="showModal === 'signup'" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = null">&times;</span>
        <h2>Sign Up</h2>
        <form @submit.prevent="signup">
          <input v-model="signupForm.username" type="text" placeholder="Username" required>
          <input v-model="signupForm.email" type="email" placeholder="Email" required>
          <input v-model="signupForm.password" type="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
      const x = ref(0);
      const showModal = ref(null);
      const loginForm = ref({ username: '', password: '' });
      const signupForm = ref({ username: '', email: '', password: '' });
  
      const isLoggedIn = computed(() => store.state.auth.isLoggedIn);
      const cartItemCount = computed(() => store.state.cart.items.length);
  
      function onMousemove(e) {
        x.value = e.clientX;
      }
  
      async function login() {
        try {
          await store.dispatch('auth/login', loginForm.value);
          showModal.value = null;
          router.push('/');
        } catch (error) {
          console.error('Login failed:', error);
        }
      }
  
      async function signup() {
        try {
          await store.dispatch('auth/signup', signupForm.value);
          showModal.value = null;
          router.push('/');
        } catch (error) {
          console.error('Signup failed:', error);
        }
      }
  
      function logout() {
        store.dispatch('auth/logout');
        router.push('/');
      }
  
      return {
        x,
        onMousemove,
        showModal,
        loginForm,
        signupForm,
        isLoggedIn,
        cartItemCount,
        login,
        signup,
        logout,
      };
    },
  };
  </script>
  
  <style>
  /* ... (keep the existing styles) ... */
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  
  button {
    padding: 0.5rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>