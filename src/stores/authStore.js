import { defineStore } from 'pinia'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')), // token?
    returnUlr: null,
  }),
})
