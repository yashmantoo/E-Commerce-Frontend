import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'




function Users() {
    const currentUser = useSelector((state) => state.user.currentUser)
    const TOKEN = currentUser.token
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    axios.defaults.headers.common["Accept"] = "application/json"
    const [users, setUsers] = useState()

    const preload = async() => {
        const res = await axios.get("https://ecommerce-backend-i0y1.onrender.com/api/v1/auth/allUsers")
        const x = res.data
        setUsers(x.allUsers)
        console.log(users)
    }

    useEffect(()=> {
        preload()
    },[])

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Usersname
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    users && users.map((user,index)=>(
                        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.name}
                    </th>
                    <td className="px-6 py-4">
                        {user.email}
                    </td>
                    <td className="px-6 py-4">
                        {user.role}
                    </td>
                </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Users