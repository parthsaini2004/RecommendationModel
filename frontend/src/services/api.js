import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL of the Node.js server
});

export default api;
