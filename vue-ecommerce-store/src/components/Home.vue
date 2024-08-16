<!-- Home.vue -->
<template>
    <div class="home">
      <h1>Welcome to Our Store</h1>
      <p>Explore our amazing products and find great deals!</p>
      <router-link to="/products" class="explore-button">Explore Products</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    padding: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .explore-button {
    display: inline-block;
    background-color: #4CAF50;
    color: white;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1.1rem;
    transition: background-color 0.3s;
  }
  
  .explore-button:hover {
    background-color: #45a049;
  }
  </style>