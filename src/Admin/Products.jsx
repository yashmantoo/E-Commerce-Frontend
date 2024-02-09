import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import { getAllProducts } from '../pages/apiHelper'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Products() {
    const [flag, setFlag] = useState(false)
    const [productList, setProductList] = useState()

    const currentUser = useSelector((state) => state.user.currentUser)
    const TOKEN = currentUser.token
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    axios.defaults.headers.common["Accept"] = "application/json"
    const buttonClick = () => {
        preload()
        if(flag)
        {
            setFlag(false)
        }
        else
        {
            setFlag(true)
        }
    }

    const deleteButton = async(Id) => {
        const res = await axios.delete(`https://ecommerce-backend-i0y1.onrender.com/api/v1/product/deleteProduct/${Id}`)
        console.log(res.data)
        preload()
    }

    const preload = () => {
        getAllProducts().then(data => {
            setProductList(data.products)
        })
    }

    useEffect(() => {
        preload()
    },[])

    return (
        <div>
          {flag ?  <ProductForm setFlag={setFlag} />: ""}
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className='flex flex-row items-center   justify-between p-2 mb-4'>
    <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products"/>
    <button onClick={buttonClick} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2">{flag?"Close Form": "Add Product"}</button>
    </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Stocks
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    productList && productList.map((prod,index)=>(
                        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {prod.name}
                    </th>
                    <td className="px-6 py-4">
                        {prod.stock}
                    </td>
                    <td className="px-6 py-4">
                        ₹ {prod.price}
                    </td>
                    <td className="px-6 py-4">
                        <button onClick={deleteButton.bind(this, prod._id)} className="font-medium text-[#E21717] dark:text-[#E21717] hover:underline">Delete</button>
                    </td>
                </tr>
                    ))
                }
            </tbody>
        </table>
      
    </div>
    </div>
      )
}

export default Products