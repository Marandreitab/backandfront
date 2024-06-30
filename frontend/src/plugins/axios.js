// plugins/axios.js
import axios from 'axios';

export default () => {
    const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/'
    
    axios.defaults.baseURL = baseURL;
}
