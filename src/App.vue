<template>
  <div class="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #171d25 0%, #1b2838 100%);
}
</style>
