<template>
  <v-app>
    <v-snackbar v-model="habitCreated" multi-line timeout="2000">
      <v-alert
        type="info"
        title="Success"
        text="Habit saved :)"
        variant="tonal"
      ></v-alert>
    </v-snackbar>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>GYST</v-toolbar-title>
      <v-btn color="primary">
        Create

        <v-dialog v-model="dialog" activator="parent" width="auto">
          <HabitForm
            @habit-created="
              () => {
                dialog = false
                habitCreated = true
              }
            "
          />
        </v-dialog>
      </v-btn>
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

      <template v-slot:append>
        <div class="pa-2 mb-6">
          <v-btn block @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HabitForm from '@/components/HabitForm.vue'

const route = useRoute()
const drawer = ref(null)
const tab = ref(route.path)
const dialog = ref(false)
const habitCreated = ref(false)
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>

<style scoped></style>
