import axios from "axios"

const BASE_URL = "http://localhost:5000/api/v1/"



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

