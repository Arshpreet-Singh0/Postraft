
import axios from "axios"
import { BACKEND_URL } from "./config"

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
