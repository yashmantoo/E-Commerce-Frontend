import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Admin/Sidebar'

function Dashboard() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.currentUser)
    const role = user.user?.role

    useEffect(() => {
        if(role!== "ADMIN")
        {
            navigate("/")
        }
    }, [navigate, role])

    return (  
        <div className='flex flex-row w-screen h-full'>
            <div className='w-1/5 h-max  border-r border-black'>
            <Sidebar/>
            </div>
            {/* right section */}
            <div className="bg-gray-100">
            {/* top section */}
            <div>
            {/* total orders */}
              <div></div>
              {/* total users */}
              <div></div>
              {/* total revenue */}
              <div></div>
            </div>
            {/* bottom section */}
            <div></div>
            </div>
        </div>
      )
}

export default Dashboard