<template>
  <v-toolbar color="grey-darken-4">
    <RouterLink to="/">
      <v-toolbar-title class="title ml-10">GYST</v-toolbar-title>
    </RouterLink>

    <v-spacer></v-spacer>

    <div v-if="!isAuthenticated">
      <RouterLink to="/login">
        <v-btn> Login </v-btn>
      </RouterLink>

      <RouterLink to="/register">
        <v-btn> Register </v-btn>
      </RouterLink>
    </div>

    <div v-else>
      <RouterLink to="/me">
        <v-btn> Account </v-btn>
      </RouterLink>
      <a href=""><v-btn @click="logout"> Logout </v-btn></a>
    </div>
  </v-toolbar>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const logout = () => {
  authStore.logout()
}
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
