import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Users from './Users'

function Userspage() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.currentUser)
    const role = user.user?.role

    useEffect(() => {
        if (role!=="ADMIN") 
        {
            navigate("/")
        }
    },[navigate, role])

    return (
        <div className='flex flex-row w-screen h-full'>
        <div className='w-1/4 h-max  border-r border-black'>
        <Sidebar/>
        </div>
          <div className='w-3/4 h-100% px-2'><Users/></div>
    </div>
      )
}

export default Userspage