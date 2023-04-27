<template>
  <v-container>
    <v-sheet width="480" class="mx-auto pa-10">
      <div v-if="isSuccess">Habit saved</div>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-color-picker
          class="mx-auto mb-6"
          :swatches="swatches"
          show-swatches
          hide-canvas
          hide-inputs
          hide-sliders
          v-model="color"
          width="400"
        ></v-color-picker>

        <v-textarea
          name="input-7-1"
          variant="filled"
          label="Description"
          auto-grow
          v-model="description"
        ></v-textarea>

        <div class="d-flex flex-column">
          <v-btn color="primary" class="mt-4" block @click="create">
            Create
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useHabitStore } from '@/stores/habitStore'

const habitStore = useHabitStore()

const swatches = ref([
  ['#FF0000', '#AA0000', '#550000'],
  ['#FFFF00', '#AAAA00', '#555500'],
  ['#00FF00', '#00AA00', '#005500'],
  ['#00FFFF', '#00AAAA', '#005555'],
  ['#0000FF', '#0000AA', '#000055'],
])

const form = ref(null)
const name = ref('')
const color = ref('')
const description = ref('')
let isSuccess = ref(false)
let isError = ref(false)
const emit = defineEmits(['habit-created', 'habit-error'])

const nameRules = ref([(v) => !!v || 'Name is required'])

const create = () => {
  try {
    habitStore.create(name.value, color.value, description.value)
    isSuccess.value = true
    form.value.reset()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped></style>
