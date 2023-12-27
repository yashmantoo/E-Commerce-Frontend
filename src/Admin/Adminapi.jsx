import {userRequest, productRequest} from "../apiRequests"

export const addProduct = async() => {
    try {
        const res = await productRequest.post("/product/addProduct")
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}



export const createCollection = async(collectionName) => {
    try {
        const res = await userRequest.post("/collection/createCollection", collectionName)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteCollection = async(Id) => {
    try {
        const res = await userRequest.delete(`/collection/deleteCollection/${Id}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}