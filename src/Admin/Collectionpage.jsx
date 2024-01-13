import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Collection from './Collection'
import Sidebar from './Sidebar'

function Collectionpage() {
    const navigate = useNavigate()
     const user = useSelector((state) => state.user.currentUser)
     const role = user.user?.role
     useEffect(() => {
        if(role!=="ADMIN")
        {
            navigate("/")
        }
     },[navigate, role])

     return (
        <div className='flex flex-row w-screen h-full'>
        <div className='w-1/5 h-max  border-r border-black'>
        <Sidebar/>
        </div>
          <div className='w-4/5 h-100% px-2 flex flex-row'>
            <Collection/>
          </div>
        </div>
      )
}

export default Collectionpage