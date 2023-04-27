<template>
  <v-container>
    <div v-if="habitStore.loading">Habits Loading...</div>
    <v-list lines="one">
      <v-list-item
        v-for="habit in habits"
        :key="habit.id"
        :title="habit.name"
        :subtitle="habit.description"
      ></v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHabitStore } from '@/stores/habitStore'
import { storeToRefs } from 'pinia'

const habitStore = useHabitStore()
const { habits } = storeToRefs(habitStore)

onMounted(() => {
  habitStore.get()
})
</script>

<style lang="scss" scoped></style>
