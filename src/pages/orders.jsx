import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useSelector } from 'react-redux'


function Orders() {
    const currentUser = useSelector((state) => state.user.currentUser)
    const TOKEN = currentUser.token
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    axios.defaults.headers.common["Accept"] = "application/json"

    const [orderHistory, setOrderHistory] = useState()

    const preload = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/order/orderHistory", currentUser.user._id)
        console.log(res.data.orders)
        const x = res.data
        setOrderHistory(x.orders)
        console.log(orderHistory)
    }

    useEffect(()=> {
        preload()
    },[])

    return (
        <div className='bg-gray-100'>
          <div className='bg-[#010409]'>
           <Navbar/>
          </div>
          <div className=' flex flex-col items-center py-4 px-2 md:px-0'>
            <div className='md:w-4/5 flex flex-col  items-start mt-8'>
              <h1 className='font-bold text-2xl'>Order History</h1>
              <p className='font-base text-gray-400 mt-1'>Check the status of recent orders, manage returns</p>
            </div>
            {
              orderHistory && orderHistory.map((order,index)=>(
                <div key={index} className='flex flex-col w-full md:w-4/5 border border-grey-300 bg-white rounded-xl mt-8 '>
            {/* order header */}
            <div className='flex flex-row items-center justify-between border-b border-gray-300 p-2'>
              <div>
                <h3 className='font-bold'>Order Id</h3>
                <p className='text-xs'>{order._id}</p>
              </div>
              <div>
                <h3 className='font-bold'>Date Placed</h3>
                <p className='text-xm'>{order.createdAt}</p>
              </div>
              <div>
                <h3 className='font-bold'>Total Amount Paid</h3>
                <p className='text-xm'>₹ {order.totalAmount}</p>
              </div>
            </div>
                
            {/* order body */}
            {
              order.products && order.products.map((prod)=>(
                <div key={prod.productId} className='flex flex-col p-2'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                  <img className='w-24' src={prod.productImage} alt='product'/>
                  <div>
                  <h3 className='ml-4 font-bold'>{prod.productName}</h3>
                  <p className='ml-4 mt-2'>Delivery Address- {order.address}</p>
                  <p className='ml-4 mt-2'>Contact No- {order.phoneNumber}</p>
                  </div>
                </div>
                <div>
                  <h3 className='font-bold'>₹ {prod.price}</h3>
                </div>
              </div>
              <div className='flex flex-row items-center justify-between p-2'>
                <h3 className='text-[#22CB5C]'>{order.status}</h3>
                <Link to={`/product/${prod.productId}`}><h3>View Product</h3></Link>
              </div>
            </div>
              ))
            }
            {/* order body ends */}
            </div>
              )).reverse()
            }
          </div>
        </div>
      )

}

export default Orders