import React, { useState } from 'react'
import {BiUserCircle} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { publicRequest } from "../apiRequests"

function Dropdown(){
    const [flag, setFlag] = useState(false)
    const user = useSelector((state) => state.user.currentUser)
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

    const dropDownHandler = () => {
        if(flag)
        {
            setFlag(false)
        }
        else{
          setFlag(true)
        }
    } 

    return (
      <div>
       <BiUserCircle size={22} className="mr-4 cursor-pointer" onClick={dropDownHandler}/>
       {flag? <div className='bg-white text-black p-2 rounded-xl z-10 absolute top-11 right-8'>
         <Link to={"/profile"}><option className='hover:bg-gray-200'>Profile</option></Link>
         <Link to={"/orderHistory"}><option className='hover:bg-gray-200'>Orders</option></Link>
         {user.user?.role!=="ADMIN"? "":    <Link to={"/dashboard"}><option className='hover:bg-gray-200'>Dashboard</option></Link>}
         {user.user?.role!=="ADMIN"? "":    <Link to={"/collection"}><option className='hover:bg-gray-200'>Collection</option></Link>}
         <Link  ><option className='hover:bg-gray-200' onClick={logoutHandler}>Logout</option></Link>
       </div> : ""}
      </div>
     )
    
}

export default Dropdown

