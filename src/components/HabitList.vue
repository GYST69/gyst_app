<template>
  <div>
    <v-list :items="habits" item-props></v-list>
    <!-- {{ habits }} -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useHabit from '@/utils/habitService'

const habitService = useHabit()

const habits = ref([])

onMounted(() => {
  habitService
    .get()
    .then((data) => {
      data.map((habit) => {
        habits.value.push({
          title: habit.name,
          value: habit.id,
        })
      })
      console.log(habits.value)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<style lang="scss" scoped></style>
