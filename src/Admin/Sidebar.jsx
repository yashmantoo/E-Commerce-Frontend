import React from 'react'
import adminImg from "../assets/adminImg.jpg"
import {BsBoxArrowRight,BsHouseFill,BsTagsFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { publicRequest } from '../apiRequests'
import { useNavigate } from 'react-router-dom'
function Sidebar() {
    const navigate = useNavigate()
    const logoutHandler = async() => {
        try {
            const res = await publicRequest.get("/auth/logout")
            console.log(res.data)
            navigate("/")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='font-poppins bg-white  h-screen flex flex-col  antialiased'>
          <div className='flex flex-row items-center border-b p-2 border-gray-400'>
          <Link to={"/"}><BsHouseFill size={20}/></Link>
          <h1 className='font-bold ml-4'>ADMIN DASHBOARD</h1>
          </div>
          <div className='flex flex-col items-center mt-4 border-b p-2 border-gray-400 '>
            <img className='w-24' src={adminImg} alt='avatar'></img>
            <h3 className='font-bold'>Yash Mantoo</h3>
            <h4 className='text-xs'>Admin</h4>
          </div>
          <Link to={"/dashboard"}>
          <div  className='mt-6 w-full p-2 flex flex-row items-start hover:bg-slate-300 cursor-pointer rounded-md transition duration-150 ease-in-out'>
          <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                  <h3 className='font-bold ml-3'>Dashboard</h3>
          </div></Link>
          <Link to={"/dashboard/products"}>
          <div className='mt-2 w-full p-2 flex flex-row items-start hover:bg-slate-300 cursor-pointer rounded-md transition duration-150 ease-in-out'>
          <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                    ></path>
                  </svg>
                  <h3 className='font-bold ml-3'>Products</h3>
          </div></Link>
          <Link to={"/dashboard/collection"}>
          <div className='mt-2 w-full p-2 flex items-center hover:bg-slate-300 cursor-pointer rounded-md transition duration-150 ease-in-out'>
          <BsTagsFill size={20}/>
          <h3 className='font-bold ml-3'>Collections</h3></div>
          </Link>
          <Link to={"/dashboard/users"}>
          <div  className='mt-2 w-full p-2 flex flex-row items-start hover:bg-slate-300 cursor-pointer rounded-md transition duration-150 ease-in-out'>
          <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                    ></path>
                  </svg>
                  <h3 className='font-bold ml-3'>Users</h3>
          </div></Link>
          <div className='mt-2 w-full p-2 flex items-center hover:bg-slate-300 cursor-pointer rounded-md transition duration-150 ease-in-out'>
          <BsBoxArrowRight size={20}/>
          <h3 className='font-bold ml-3' onClick={logoutHandler} >Logout</h3></div>
        </div>
      )
}

export default Sidebar