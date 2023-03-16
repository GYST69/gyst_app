<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="px-2">
      <v-tabs v-model="tab" direction="vertical">
        <RouterLink to="/me" class="w-100 text-white pb-1">
          <v-tab value="/me" class="w-100">
            <v-icon class="ml-4 mr-1"> mdi-calendar-check </v-icon>
            Dashboard
          </v-tab>
        </RouterLink>
        <RouterLink to="/me/habits" class="w-100 text-white pb-1">
          <v-tab value="/me/habits" class="w-100">
            <v-icon class="ml-4 mr-1"> mdi-autorenew </v-icon>
            Habits
          </v-tab>
        </RouterLink>
      </v-tabs>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const drawer = ref(null)
const tab = ref(route.path)
</script>

<style scoped></style>
