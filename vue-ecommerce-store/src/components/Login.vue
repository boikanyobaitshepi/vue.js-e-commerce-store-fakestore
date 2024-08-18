<!-- <template>
  <div class="login-container">
    <div class="login">
    <div v-if="isLoggedIn" class="logged-in">
      <p>Welcome, {{ username }}!</p>
      <button @click="handleLogout" class="logout-button">Log Out</button>
    </div>
    <form v-else @submit.prevent="handleSubmit" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model.trim="username"
          required
          autocomplete="username"
          placeholder="Enter your username"
          class="form-input"
          :disabled="isLoading"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model.trim="password"
            required
            autocomplete="current-password"
            placeholder="Enter your password"
            class="form-input"
            :disabled="isLoading"
          />
          <button type="button" @click="togglePassword" class="toggle-password" :disabled="isLoading">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" aria-label="Toggle password visibility"></i>
          </button>
        </div>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <button type="submit" :disabled="isLoading" class="submit-button">
        <span v-if="isLoading" class="loader"></span>
        <span v-else>Log In</span>
      </button>
    </form>
  </div>
</template> -->
<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required>
      <div class="password-input">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" required>
        <button type="button" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
      </div>
      <button type="submit" :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Login' }}</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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

    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const isLoading = ref(false);
    const error = ref('');

    // const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
    // const currentUser = computed(() => store.getters['auth/currentUser']);

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
      if (!username.value || !password.value) {
        error.value = 'Username and password are required';
        return;
      }

      isLoading.value = true;
      error.value = '';

      try {
        await store.dispatch('auth/login', {
          username: username.value,
          password: password.value,
        });
        router.push('/dashboard');
      } catch (err) {
        error.value = 'Invalid username or password';
      } finally {
        isLoading.value = false;
      }
    };
    const handleLogin = async () => {
      isLoading.value = true;
      error.value = '';
      try {
        await store.dispatch('auth/login', { username: username.value, password: password.value });
        router.push('/');
      } catch (err) {
        error.value = 'Invalid username or password';
      } finally {
        isLoading.value = false;
      }
    };

    const handleLogout = () => {
      store.dispatch('auth/logout');
      router.push('/login');
    };

    return {
      username,
      password,
      showPassword,
      isLoading,
      error,
      isLoggedIn,
      currentUser,
      togglePassword,
      handleSubmit,
      handleLogout,
      handleLogin
    };
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logged-in {
  text-align: center;
}

.logout-button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #3e8e41;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.toggle-password i {
  font-size: 18px;
  color: #666;
}

.toggle-password:hover i {
  color: #333;
}

.submit-button {
  position: relative;
  background-color: #009688;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top: 2px solid #009688;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.toggle-password:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>