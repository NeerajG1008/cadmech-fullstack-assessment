import axios from "axios";

const api = axios.create({
  baseURL: "https://cadmech-fullstack-assessment-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;