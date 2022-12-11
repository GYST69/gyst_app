import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/index.js'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: JSON.parse(localStorage.getItem('token')),
    returnUlr: null,
    error: false,
  }),
  actions: {
    async register(email, password) {
      axios
        .post(`${baseUrl}/register/`, {
          email: email,
          password: password,
        })
        .then((response) => {
          const token = response.data
          this.token = token

          localStorage.setItem('token', JSON.stringify(token))

          router.push(this.returnUrl || { name: 'me' })
        })
        .catch((err) => {
          this.error = true
        })
    },

    async login(email, password) {
      axios
        .post(`${baseUrl}/token/`, {
          username: email,
          password: password,
        })
        .then((response) => {
          const token = response.data
          this.token = token

          localStorage.setItem('token', JSON.stringify(token))

          router.push(this.returnUrl || { name: 'me' })
        })
        .catch((err) => {
          this.error = true
        })
    },

    logout() {
      this.token = null
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    },
  },

  getters: {
    isAuthenticated() {
      return !!this.token
    },

    isError() {
      return this.error
    },
  },
})
