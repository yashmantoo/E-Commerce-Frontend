import {userRequest, publicRequest} from "../apiRequests"

export const getAllProducts = async() => {
    try {
        const res = await userRequest.get("/product/getAllProducts")
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllCollections = async() => {
    try {
        const res = await userRequest.get("/collection/getAllCollections")
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}

export const getProductById = async(id) => {
    try {
        const res = await userRequest.get(`/product/getProductById/${id}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}

export const getProductByCollection = async(id) => {
    try {
        const res = await publicRequest.get(`/product/getProductByCollection/${id}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error

    }
}

export const getOrderHistory = async() => {
    try {
        const res = await userRequest.get("/order/orderHistory")
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}