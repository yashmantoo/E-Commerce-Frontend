import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Collection from '../Admin/Collection'

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
                gregegbfbfvgfgvdfgvefgvefve
            </div>
        </div>
    )
}

export default Dashboard