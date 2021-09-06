import axios from "axios";

const api = axios.create({
  baseURL: `http://cuestionarios-api.test/api/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;