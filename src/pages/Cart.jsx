import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import { incrementQuantity, decrementQuantity, removeItem, clearCart } from '../redux/cart'
import { useNavigate } from 'react-router-dom'



function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.currentUser)
    const cartList = useSelector((state) => state.cart.products)
    const [totalPrice, setTotalPrice] = useState()
    const [quantity,setQuantity] = useState()

    useEffect(() => {
        let sum = 0
        let quant = 0
        cartList.forEach(element => {
            sum += element.price*element.quantity
            quant += element.quantity
        });
        setQuantity(quant)
        setTotalPrice(sum)
    },[cartList])

    const increase = (id) => {
        dispatch(incrementQuantity({_id: id}))
    }
    const decrease = (id) => {
        dispatch(decrementQuantity({_id: id}))
    }
    const remove = (id) => {
        dispatch(removeItem({_id: id}))
    }
    const clearCartItems = () => {
        dispatch(clearCart())
    }

    const redirect = () => {
        if(!user)
        {
            navigate("/logIn")
            window.alert("Please login to complete your purchase")
        }
        else
        {
            navigate("/checkout",
                {
                    state: {products: cartList, quantity: quantity, totalPrice: totalPrice}
                } 
            )
        }
    }

    if(cartList.length<1)
    {
      return(
        <div>
        <div className='bg-[#010409]'>
           <Navbar/>
         </div>
         <div className='w-full h-screen flex items-center justify-center border border-black'>
         <h1 className='font-bold text-2xl'>Cart is Empty...</h1>
         </div>
        </div>
      )
    }

    return (
        <div>
        <div className='bg-[#010409]'>
        <Navbar/>
        </div>
        <div className='flex md:flex-row flex-col mt-8 px-2'>
        <div className=" md:w-2/3 w-full">
            {
              cartList && cartList.map((product, index)=>(
                <div key={index} className="overflow-clip p-2 flex flex-col md:flex-row items-center  justify-between  bg-white shadow-md rounded-xl mb-4">
                <div className='flex flex-row items-center w-64'>
                <img className="w-20 h-20 object-scale-down" alt='product' src={product && product.photos[0]?.secure_url}></img>
                <h3 className="truncate block ml-2">{product.name}</h3>
                </div>
                {/* counter */}
                <div className='flex flex-row h-8 w-28 items-center justify-between bg-gray-100'>
                    <button onClick={decrease.bind(this,product._id)} className='px-2 bg-gray-200'><span className='text-2xl font-thin'>-</span></button>
                    <div className='px-2'><h4>{product.quantity}</h4></div>
                    <button onClick={increase.bind(this,product._id)} className='px-2 bg-gray-200'><span className='text-2xl font-thin'>+</span></button>
                </div>
                <h3>₹ {product.price*product.quantity}</h3>
                <button onClick={remove.bind(this,product._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" >Remove</button>
                </div>
              ))
            }
            <button className='btn btn-primary' onClick={clearCartItems}>Clear Cart</button>
          </div>
          <div className="flex flex-col md:ml-4 bg-white shadow-md rounded-xl md:w-1/3 w-full h-max py-6 px-4 ">
            <div className="p-2 border-b-2  border-grey"><h3 className='font-bold'>BILL DETAILS</h3></div>
            <div>
              <div className="flex flex-row items-center justify-between border border-grey p-2 mt-4"><h3>Price ({quantity} items)</h3> <h3>₹ {totalPrice}</h3></div>
              </div>
              <div className="flex flex-row items-center justify-between border border-grey p-2 mt-3"><h3>Delivery Charges</h3> <h3 className='text-[#22CB5C]'>FREE</h3></div>
              <div className="flex flex-row items-center justify-between border border-grey p-2 mt-4"><h3 className="text-lg text-black font-bold">Total Amount</h3> <h3 className="text-lg text-black font-bold">{totalPrice}</h3></div>
              <div onClick={redirect} className="flex justify-center  mt-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Check Out</button></div>
            </div>
          </div>
          </div>
    )
}

export default Cart