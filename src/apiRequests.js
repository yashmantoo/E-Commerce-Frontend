import axios from "axios"

const BASE_URL = "https://ecommerce-backend-i0y1.onrender.com/api/v1"



export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{
        Accept: "application/json",

    }

})

export const productRequest = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "multipart/form-data, application/json",
    }
})

