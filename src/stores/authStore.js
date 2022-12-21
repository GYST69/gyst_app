import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/index.js'
import {
  getLocalToken,
  removeLocalToken,
  setLocalToken,
} from '@/utils/tokenService'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: getLocalToken(),
    returnUlr: null,
    error: false,
  }),
  actions: {
    async register(email, password) {
      await axios
        .post(`${baseUrl}/register/`, {
          email,
          password,
        })
        .then((response) => {
          const token = response.data
          this.token = token

          setLocalToken(token)

          router.push(this.returnUrl || { name: 'me' })
        })
        .catch(() => {
          this.error = true
        })
    },

    async login(email, password) {
      await axios
        .post(`${baseUrl}/token/`, {
          email,
          password,
        })
        .then((response) => {
          const token = response.data
          this.token = token

          setLocalToken(token)

          router.push(this.returnUrl || { name: 'me' })
        })
        .catch((err) => {
          console.log(err)
          this.error = true
        })
    },

    logout() {
      this.token = null
      removeLocalToken()
      router.push({ name: 'login' })
    },

    async update() {
      console.log('refresh')
      await axios
        .post(`${baseUrl}/token/refresh/`, {
          refresh: this.token.refresh,
        })
        .then((response) => {
          const token = response.data
          this.token = token

          setLocalToken(token)
        })
        .catch((err) => {
          console.error(err)
          this.logout()
        })
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
