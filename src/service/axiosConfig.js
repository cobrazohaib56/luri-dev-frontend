import axios from "axios"
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ?
        "http://127.0.0.1:8000" :
        "https://luri-dev-backend.azurewebsites.net",
        // "https://api.complainer.com/",
        // "https://dev-api.wwjdchat.com/",
});

// Interceptor to set token dynamically before each request
axiosInstance.interceptors.request.use(
  config => {
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    if (authUser && authUser.token) {
      config.headers.Authorization = `Bearer ${authUser.token.access}`
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if(window.location.pathname !== "/login"){
      if (error.response.status === 401) {
        localStorage.removeItem("authUser")
        window.location = "/login"
      }
    }
    if (error.response.status >= 500) {
      window.location = "/page500"
    }
    return Promise.reject(error);
  }
)

export default axiosInstance
