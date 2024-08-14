<!-- 
<template>
    <button @click="toggleTheme" class="theme-toggle" :aria-label="buttonLabel">
      <span v-if="currentTheme === 'light'">🌙</span>
      <span v-else>☀️</span>
    </button>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    setup() {
      const store = useStore()
      const currentTheme = computed(() => store.state.theme)
      const buttonLabel = computed(() => 
        currentTheme.value === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      )
  
      const toggleTheme = () => {
        store.dispatch('toggleTheme')
      }
  
      return {
        currentTheme,
        buttonLabel,
        toggleTheme
      }
    }
  }
  </script>
  
  <style scoped>
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
  </style> -->
  <template></template> 