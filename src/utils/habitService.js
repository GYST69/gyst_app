import api from '@/utils/api'

const baseUrl = `${import.meta.env.VITE_API_URL}/habits/`

export default function useHabit() {
  const create = (name, color, description) => {
    api
      .post(baseUrl, {
        name: name,
        color: color,
        description: description,
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { create }
}
