<template>
  <div id="app">
    <app-header></app-header>

    <md-layout md-align="center">
      <md-layout md-flex-small="90" md-flex="80" md-flex-xlarge="60">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
    </md-layout>
  </md-layout>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  
  export default {
    components: {
      'app-header': Header
    }
  }
</script>

<style>

</style>
