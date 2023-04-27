<template>
  <v-main class="container">
    <v-row class="h-100">
      <v-col class="pa-0">
        <div class="left-column pa-5 mx-auto">
          <v-container>
            <div v-if="isError">
              <br />
              <v-alert type="error"> Sorry, something went wrong </v-alert>
              <br />
            </div>
            <div class="pb-8">
              <v-card-title class="text-h6 text-md-h5 text-lg-h4"
                >Sign Up</v-card-title
              >
              <v-card-text
                >Set your goals and make new habit today!</v-card-text
              >
            </div>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
                class="pb-2"
              ></v-text-field>

              <v-text-field
                type="password"
                v-model="password"
                label="Password"
                required
              ></v-text-field>
              <div class="d-inline-flex align-center w-100">
                <v-checkbox
                  label="I agree to terms and conditions"
                  v-model="consent"
                  color="indigo"
                ></v-checkbox>
              </div>
            </v-form>

            <v-btn block size="large" @click="register">Sign Up</v-btn>
          </v-container>
          <div class="pa-4 mt-6 w-100">
            Already have an account?
            <RouterLink to="/login">Login</RouterLink>
          </div>
        </div>
        <div class="footer">
          &copy;2023 Get Your Shit Together All rights reserved
        </div>
      </v-col>
      <v-col class="pa-0 d-none d-md-flex">
        <v-layout full-height>
          <v-img cover src="/src/assets/img/bird.jpg"></v-img>
        </v-layout>
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const { isError } = storeToRefs(authStore)

const email = ref('')
const password = ref('')
const consent = ref('')
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 480px;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  padding-bottom: 2rem;
}
</style>
