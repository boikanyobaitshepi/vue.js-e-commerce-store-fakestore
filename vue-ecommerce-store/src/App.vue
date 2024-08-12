<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <!-- <Home/> -->
      <!-- <router-link to="/login">Login</router-link> -->
    </nav>
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from './views/Home.vue';
import Header from './components/Header.vue';
// import Home from './views/Home.vue';
// export default {
//   name: 'App'
// }
</script>