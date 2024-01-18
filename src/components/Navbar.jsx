import React from "react"
import { Link } from "react-router-dom"
import {BsCart3} from 'react-icons/bs'
import { useSelector } from "react-redux"
import Dropdown from "./Dropdown"
function Navbar(){
    const user = useSelector((state)=> state.user.currentUser)
    const cart = useSelector((state)=> state.cart.products)
    return (
        <header className="text-white body-font  w-full">
      <div className=" mx-auto flex flex-wrap px-5 py-2  md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-lg text-white">Instruments</span>
        </div>
        <nav className="pl-4 md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:scale-105" to="/">Home</Link>
         {user?"": <Link className="mr-5 hover:scale-105" to="/logIn">Login</Link>}
         {user?"": <Link className="mr-5 hover:scale-105" to="/signup">Register</Link>}
          <Link className="mr-5 hover:scale-105" to="/shop">Shop</Link>
        </nav>
        <div>
        {user? <Dropdown/> : ""}
        </div>
         <div>
         <Link to="/cart"><BsCart3 className='hover:scale-110'/></Link>
         <h3 className='absolute top-2 ml-5 text-sm'>{cart.length>=1? cart.length: ""}</h3>
         </div>
      </div>
    </header>
      )
    
}
export default Navbar