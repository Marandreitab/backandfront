// plugins/axios.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'
axios.defaults.baseURL = baseURL;


export default app;
