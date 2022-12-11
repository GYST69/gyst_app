<template>
  <v-container>
    <v-card elevation="2" max-width="640" class="mx-auto my-12">
      <v-toolbar color="hsla(160, 100%, 37%, 1">
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <div v-if="isError">
        <br />
        <v-alert type="error" class="mx-4"
          >Sorry, coud not create account</v-alert
        >
        <br />
      </div>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            class="pb-2"
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            label="Password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="hsla(160, 100%, 37%, 1" class="mr-4" @click="register">
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const { isError } = storeToRefs(authStore)

const email = ref('')
const password = ref('')
const valid = ref('')
const emailRules = ref([
  (v) => !!v || 'E-mail is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])
const form = ref(null)

const register = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    authStore.register(email.value, password.value)
  }
}
</script>
