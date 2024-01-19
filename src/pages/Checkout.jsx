import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/cart'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'



function Checkout() {
    const {state} = useLocation()
    const dispatch = useDispatch()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const navigate = useNavigate()
    
    const paymentHandler = () => {
        console.log(state)
        if(!(phone && address))
        {
            toast.warn("Please fill all shiping details !", {
                position: toast.POSITION.TOP_CENTER
        });
        }
    }
}

export default Checkout