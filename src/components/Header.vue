<template>
  <md-toolbar class="navbar">
    <router-link to="/" class="navbar__item">
      <h2 class="md-title">Лекции</h2>
    </router-link>
    <router-link to="/results" class="navbar__item">
      <h2 class="md-title">Результаты</h2>
    </router-link>
  </md-toolbar>
</template>

<script>
  export default {
    name: 'header',
    data() {
      return {
        
      }
    }
  }
</script>

<style>
  .navbar {
    margin-bottom: 32px;
  }
  .navbar__item {
    padding-right: 24px;
    padding-left: 24px;
  }
  .navbar__item:hover {
    color: white !important;
    text-decoration: none !important;
  }
</style>