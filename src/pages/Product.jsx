import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom'
import { getProductById } from './apiHelper'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cart'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function Product() {
    const location = useLocation()
    const dispatch = useDispatch()
    const productId = location.pathname.split("/")[2]
    const [product, setProduct] = useState()

    const handleClick = () => {
        dispatch(addProduct(product))
        toast.success("Added to Cart!",{
            position: toast.POSITION.TOP_RIGHT
        })
    }

    useEffect(() => {
        getProductById(productId).then(data => {
            setProduct(data.product)
            console.log(data)
        })
    },[productId])

    return (
        <div className=' w-full h-full'>
        <div className='bg-[#010409]'>
        <Navbar/>
        </div>
        <div>
        <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-6 mx-auto">
        <div className="lg:w-5/6 mx-auto flex flex-wrap ">
          <img alt='product Image' className="lg:w-1/2 w-full lg:h-auto h-64  object-center object-scale-down rounded-xl" src={product && product.photos[0]?.secure_url}/>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product && product.name}</h1>
            
            <p className="leading-relaxed">{product && product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                {/* <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button> */}
              </div>
              <div className="flex ml-6 items-center">
               
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹ {product && product.price}</span>
              <button onClick={handleClick} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
        <ToastContainer/>
        </div>
      )
}

export default Product