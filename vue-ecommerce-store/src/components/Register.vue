<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="username" type="text" placeholder="Username" required>
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required>
        <button type="submit" :disabled="isLoading">Register</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const error = ref('');
      const isLoading = ref(false);
  
      async function handleSubmit() {
        if (password.value !== confirmPassword.value) {
          error.value = "Passwords don't match";
          return;
        }
  
        isLoading.value = true;
        error.value = '';
  
        try {
          await store.dispatch('register', {
            username: username.value,
            email: email.value,
            password: password.value,
          });
          router.push('/');
        } catch (err) {
          error.value = 'Registration failed. Please try again.';
        } finally {
          isLoading.value = false;
        }
      }
  
      return {
        username,
        email,
        password,
        confirmPassword,
        error,
        isLoading,
        handleSubmit,
      };
    }
  }
  </script>
  
  <style scoped>
  .register {
    max-width: 300px;
    margin: 0 auto;
  }
  
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
  }
  
  .error {
    color: red;
  }
  </style>