import api from '@/utils/api'

const baseUrl = `${import.meta.env.VITE_API_URL}/habits/`

export default function useHabit() {
  const create = async (name, color, description) => {
    try {
      const response = await api.post(baseUrl, {
        name: name,
        color: color,
        description: description,
      })
      return response.data
    } catch (error) {
      console.log('Can not create habit', error)
      throw error
    }
  }

  const get = async () => {
    try {
      const response = await api.get(baseUrl)
      return response.data
    } catch (error) {
      console.log('Can not get habits', error)
      throw error
    }
  }

  return { create, get }
}
