import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/cart'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import axios from 'axios'



function Checkout() {
    const {state} = useLocation()
    const dispatch = useDispatch()
    const [phoneNumber, setPhoneNumber] = useState()
    const [address, setAddress] = useState()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.currentUser)
    const name = currentUser.user.name
    const email = currentUser.user.email
    const TOKEN = currentUser.token
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    axios.defaults.headers.common["Accept"] = "application/json"
    
    const paymentHandler = async() => {

        console.log(state)
        if(!(phoneNumber && address))
        {
            toast.warn("Please fill all shiping details !", {
                position: toast.POSITION.TOP_CENTER
            });
        }

        else
        {
            const res = await axios.get("http://localhost:5000/api/v1/order/getRazorpayKey")
            const key = res.data.key
            console.log(key)

            const order = await axios.post("http://localhost:5000/api/v1/order/payment", {product: state.products})
            console.log(order)

            const options = {
                key: key,
                amount: state.totalPrice,
                currency: "INR",
                name: "Yash Mantoo",
                description: "Test Transaction",
                image: "",
                order_id: order.data.order.id,

                handler: async function (response) {
                    const data = {
                        orderCreationId: options.order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    }
                    console.log(data)

                    const result = await axios.post("http://localhost:5000/api/v1/order/paymentVerification", {orderCreationId: data.orderCreationId, razorpayPaymentId: data.razorpayPaymentId, razorpayOrderId: data.razorpayOrderId, razorpaySignature: data.razorpaySignature, product: state.products, address, phoneNumber, amount: state.totalPrice})
                    console.log(result)

                        dispatch(clearCart())
                        navigate("/success")

                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phoneNumber

                },
                theme: {
                    color: "#61dafb",

                },
            }

            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        }
    }

    return (
        <div>
          <div className='bg-[#010409]'>
           <Navbar/>
          </div>
          <div className='flex flex-col md:flex-row w-full md:px-24 mt-10'>
            <div className='md:w-2/3 bg-white shadow-md rounded-xl'>
                <div className='w-full flex items-start px-5 '><h1 className='font-bold text-2xl'>Check Out</h1></div>
                <div>
                <div className='w-full flex items-start px-5 mt-6'><h2 className='font-bold text-xm'>Shipping Details</h2></div>
                    <div className='flex flex-row items-center px-5 mt-6'>
                        <label>Phone Number:</label>
                        <input onChange={(e)=>
                          setPhoneNumber(e.target.value) } className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 w-64 ml-2' type="text" placeholder='Phone Number'></input>
                    </div>
                    <div className='flex flex-row items-center px-5 mt-6'>
                      <label>Shipping Address:</label>
                      <textarea onChange={(e)=>
                          setAddress(e.target.value) } className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 w-64 ml-2'  type="text" placeholder='Address'></textarea>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:ml-4 bg-white shadow-md rounded-xl md:w-1/3 w-full h-max py-6 px-4'>
            <div className="p-2 border-b-2  border-grey"><h3 className='font-bold'>ORDER SUMMARY</h3></div>
            <div>
              <div className="flex flex-row items-center justify-between border border-grey p-2 mt-4"><h3>Price ({state.quantity} items)</h3> <h3>₹ {state.totalPrice}</h3></div>
              <div className="flex flex-row items-center justify-between border border-grey p-2 mt-3"><h3>Delivery Charges</h3> <h3 className='text-[#22CB5C]'>FREE</h3></div>
              <div className="flex flex-row items-center justify-between border border-grey p-2 mt-4"><h3 className="text-lg text-black font-bold">Total Amount</h3> <h3 className="text-lg text-black font-bold">₹ {state.totalPrice}</h3></div>
              <div onClick={paymentHandler} className="flex justify-center  mt-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Proceed to payment</button></div>
            </div>
            </div>
           </div>
           <ToastContainer/>
        </div>
      )

}

export default Checkout