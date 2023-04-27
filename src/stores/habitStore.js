import { defineStore } from 'pinia'
import api from '@/utils/api'

const baseUrl = `${import.meta.env.VITE_API_URL}/habits/`

export const useHabitStore = defineStore('habitStore', {
  state: () => ({
    habits: [],
    loading: false,
    success: false,
    error: false,
  }),
  actions: {
    async create(name, color, description) {
      try {
        const response = await api.post(baseUrl, {
          name: name,
          color: color,
          description: description,
        })

        this.habits.push(response.data)
        this.success = true
      } catch (error) {
        console.log('Can not create habit', error)
        this.error = true
        throw error
      }
    },

    async get() {
      try {
        this.loading = true
        const response = await api.get(baseUrl)
        this.habits = response.data
        this.loading = false
      } catch (error) {
        console.log('Can not get habits', error)
        this.error = true
        throw error
      }
    },
  },

  getters: {
    getHabits() {
      return this.habits
    },
  },
})
