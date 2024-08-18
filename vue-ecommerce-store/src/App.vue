<template>
  <!-- <div id="app"> -->
 
    <Header/>
    <ThemeToggle/>
    <router-view></router-view>
  <!-- </div> -->
</template>

<script>

import Header from './components/Header.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import './assets/style.css'



export default {
  name:'App',
  components:{
    Header,
    ThemeToggle,
  },
  // setup() {
  //   const store = useStore();

  //   onMounted(() => {
  //     store.dispatch('initTheme');
  //   });
  // },
 
}
</script>
