import axios from "axios";

const api = axios.create({
  baseURL: `https://cuestionarios-api.test/public/api/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;