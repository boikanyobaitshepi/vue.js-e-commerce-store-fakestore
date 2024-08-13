<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          required
        />
        <button type="button" @click="togglePassword">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <p v-if="error" style="color: red;">{{ error }}</p>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Log In' }}
      </button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const isLoading = ref(false);
      const error = ref('');
  
      const router = useRouter();
      const route = useRoute();
  
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
          const response = await axios.post('https://fakestoreapi.com/auth/login', 
            { username: username.value, password: password.value },
            { headers: { 'Content-Type': 'application/json' } }
          );
  
          localStorage.setItem('token', response.data.token);
          isLoading.value = false;
  
          // Redirect to the previous page or home
          const from = route.query.redirect || '/';
          router.replace(from);
        } catch (err) {
          isLoading.value = false;
          error.value = 'Login failed. Please check your credentials.';
        }
      };
  
      return {
        username,
        password,
        showPassword,
        isLoading,
        error,
        togglePassword,
        handleSubmit
      };
    }
  };
  </script>