import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { getLocalToken } from '@/utils/tokenService'

const baseURL = `${import.meta.env.VITE_API_URL}`

const getApi = () => {
  const api = axios.create({
    baseURL,
  })

  api.interceptors.request.use(
    async (config) => {
      const token = getLocalToken()
      config.headers = {
        Authorization: `Bearer ${token?.access}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const authStore = useAuthStore()
      if (error.response.status === 401) {
        authStore.update().then(() => {
          const token = authStore.getToken
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${token?.access}`
          return api(error.config)
        })
      }
      return Promise.reject(error)
    }
  )

  return api
}

export default getApi()
