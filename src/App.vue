<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <v-app :theme="dark">
    <v-content>
      <NavBar />
      <RouterView />
    </v-content>
  </v-app>
</template>
