<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/" v-if="!isLoggedIn">Home</router-link>
      <router-link to="/">Home</router-link> |
      <a href="#" @click.prevent="handleLogout" v-if="isLoggedIn">Log Out</a>
      <Home/>
      <router-link to="/login">Login</router-link>
    </nav> -->
    <Header/>
    <ThemeToogle/>
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from './views/Home.vue';
import Header from './components/Header.vue';
import ThemeToogle from './components/ThemeToogle.vue';
// import Home from './views/Home.vue';
// export default {
//   name: 'App'
// // }
// export default {
//   setup() {
//     const router = useRouter();

//     const isLoggedIn = computed(() => {
//       return !!localStorage.getItem('token');
//     });

//     const handleLogout = () => {
//       localStorage.removeItem('token');
//       router.push('/');
//     };

//     return {
//       isLoggedIn,
//       handleLogout
//     };
//   }
// };

export default {
  name:'App',
  components:{
    Header
  },
  components: {
    ThemeToogle
  },
  // setup() {
  //   const store = useStore()

  //   onMounted(() => {
  //     store.dispatch('initTheme')
  //   })
  // }
}
</script>
