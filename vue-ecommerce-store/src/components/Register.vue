<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          id="username"
          v-model="username"
          type="text"
          @blur="validateUsername"
          :class="{ 'is-invalid': !isUsernameValid && isUsernameTouched }"
        >
        <div v-if="!isUsernameValid && isUsernameTouched" class="invalid-feedback">
          Username must be at least 3 characters long.
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="email"
          type="email"
          @blur="validateEmail"
          :class="{ 'is-invalid': !isEmailValid && isEmailTouched }"
        >
        <div v-if="!isEmailValid && isEmailTouched" class="invalid-feedback">
          Please enter a valid email address.
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password"
          type="password"
          @blur="validatePassword"
          :class="{ 'is-invalid': !isPasswordValid && isPasswordTouched }"
        >
        <div v-if="!isPasswordValid && isPasswordTouched" class="invalid-feedback">
          Password must be at least 6 characters long.
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          @blur="validateConfirmPassword"
          :class="{ 'is-invalid': !isConfirmPasswordValid && isConfirmPasswordTouched }"
        >
        <div v-if="!isConfirmPasswordValid && isConfirmPasswordTouched" class="invalid-feedback">
          Passwords do not match.
        </div>
      </div>

      <button type="submit" :disabled="!isFormValid || isLoading">Register</button>
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
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const error = ref('');
    const isLoading = ref(false);

    const isUsernameTouched = ref(false);
    const isEmailTouched = ref(false);
    const isPasswordTouched = ref(false);
    const isConfirmPasswordTouched = ref(false);

    const isUsernameValid = computed(() => username.value.length >= 3);
    const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
    const isPasswordValid = computed(() => password.value.length >= 6);
    const isConfirmPasswordValid = computed(() => password.value === confirmPassword.value);

    const isFormValid = computed(() => 
      isUsernameValid.value && 
      isEmailValid.value && 
      isPasswordValid.value && 
      isConfirmPasswordValid.value
    );

    function validateUsername() {
      isUsernameTouched.value = true;
    }

    function validateEmail() {
      isEmailTouched.value = true;
    }

    function validatePassword() {
      isPasswordTouched.value = true;
    }

    function validateConfirmPassword() {
      isConfirmPasswordTouched.value = true;
    }

    async function handleSubmit() {
      if (!isFormValid.value) return;

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
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isConfirmPasswordValid,
      isUsernameTouched,
      isEmailTouched,
      isPasswordTouched,
      isConfirmPasswordTouched,
      isFormValid,
      validateUsername,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
}

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>