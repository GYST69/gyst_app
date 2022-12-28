import axios from 'axios'
import { getLocalToken } from '@/utils/tokenService'
import { useAuthStore } from '@/stores/authStore'

const baseURL = `${import.meta.env.VITE_API_URL}`

const authStore = useAuthStore()

const token = getLocalToken()

const api = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token?.access}` },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return authStore.update().then(() => axios(error.config))
    }
    return Promise.reject(error)
  }
)

export default api
