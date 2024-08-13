Copy<template>
  <header
    @mousemove="onMousemove"
    :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  >
    <nav>
      <ul>
        <li><router-link to="/"><i class="fas fa-store"></i> Home</router-link></li>
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
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  </header>
  
    <main>
      <router-view></router-view>
    </main>
  
    <!-- <div v-if="showModal === 'login'" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = null">&times;</span>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input v-model="loginForm.username" type="text" placeholder="Username" required>
          <input v-model="loginForm.password" type="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>
    </div> -->
  
 
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import ThemeToogle from './ThemeToogle.vue';
  
  export default {
    components: {
    ThemeToogle  // Add this line
  },
    setup() {
      const store = useStore();
      const router = useRouter();
      const x = ref(0);
      const showModal = ref(null);
      const loginForm = ref({ username: '', password: '' });
      const signupForm = ref({ username: '', email: '', password: '' });
      // const store = useStore();
  
    //   const isLoggedIn = computed(() => store.state.auth.isLoggedIn);
    //   const cartItemCount = computed(() => store.state.cart.items.length);
    onMounted(() => {
      store.dispatch('initTheme');  // Initialize theme
    });
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
        // isLoggedIn,
        // cartItemCount,
        login,
        signup,
        logout,
      };
    },
  };
  </script>
  
  <style>
  header {
  transition: 0.3s background-color ease;
  padding: 1rem;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin: 0 1rem;
}

nav a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

nav i {
  margin-right: 0.5rem;
}

main {
  padding: 2rem;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
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
  .theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #fff;
  padding: 0;
  margin: 0;
}
  </style>