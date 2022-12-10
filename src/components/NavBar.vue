<template>
  <v-toolbar color="grey-darken-4">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <RouterLink to="/">
      <v-toolbar-title class="title">GYST</v-toolbar-title>
    </RouterLink>

    <v-spacer></v-spacer>

    <RouterLink to="/login">
      <v-btn> Login </v-btn>
    </RouterLink>

    <RouterLink to="/register">
      <v-btn> Register </v-btn>
    </RouterLink>
  </v-toolbar>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
a.router-link-exact-active {
  color: var(--color-text);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}

.title {
  color: var(--color-text);
}
</style>
