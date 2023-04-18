<template>
  <v-container>
    <v-sheet width="480" class="mx-auto pa-10">
      <div v-if="isSuccess">Habit saved</div>
      <v-alert
        v-if="isSuccess"
        type="info"
        title="Success"
        text="Habit saved :)"
        variant="tonal"
      ></v-alert>
      <!-- <v-alert
        v-if="isError"
        type="error"
        title="Error"
        text="Something went wrong :("
        variant="tonal"
      ></v-alert> -->

      <!-- <v-snackbar v-model="isSuccess" multi-line timeout="5000">
        <v-alert
          type="info"
          title="Success"
          text="Habit saved :)"
          variant="tonal"
        ></v-alert>
      </v-snackbar> -->

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
import useHabit from '@/utils/habitService'

const habitService = useHabit()

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
    habitService.create(name.value, color.value, description.value)
    isSuccess.value = true
    form.value.reset()
    emit('habit-created')
  } catch (error) {
    isError.value = true
    console.log(error)
  }
}
</script>

<style lang="scss" scoped></style>
