import axios from "axios"

const api = axios.create({
  baseURL: "https:/api.icreativezapp.com/api",
})

api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken")
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
})

export default api
