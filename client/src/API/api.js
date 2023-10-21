import axios from 'axios';

const baseURL = "http://localhost:7777/api/products"

const api = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        Accept: "application/json"
    }
})

export default api