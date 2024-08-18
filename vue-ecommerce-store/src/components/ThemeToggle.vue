<!-- components/ThemeToggle.vue -->
<template>
  <button @click="toggleTheme" :aria-label="buttonLabel" class="theme-toggle">
    <span v-if="currentTheme === 'light'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ThemeToggle',
  setup() {
    const store = useStore();
    const currentTheme = computed(() => store.getters.currentTheme);

    const toggleTheme = () => {
      store.dispatch('toggleTheme');
    };

    const buttonLabel = computed(() => 
      currentTheme.value === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
    );

    return {
      currentTheme,
      toggleTheme,
      buttonLabel,
    };
  },
};
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
}
</style>