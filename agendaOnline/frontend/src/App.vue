<template>
  <div class="app">
    <AppHeader />

    <main class="container py-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
  background: #F8F6F3;
  font-family: 'Segoe UI', sans-serif;
}

.app {
  min-height: 100vh;
  background: #F8F6F3;
}

main {
  background: #F8F6F3;
  min-height: calc(100vh - 80px);
}
</style>