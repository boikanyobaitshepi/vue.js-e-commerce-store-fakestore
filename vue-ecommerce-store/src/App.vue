<template>
  <div id="app">
 
    <Header/>
    <ThemeToggle/>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/Header.vue';
import ThemeToggle from './components/ThemeToggle.vue';


export default {
  name:'App',
  components:{
    Header,
    ThemeToggle,
  },
 
}
</script>
