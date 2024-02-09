import React, { useEffect, useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { getAllCollections } from "../pages/apiHelper.js"
import axios from 'axios'
import { useSelector } from 'react-redux'

function Collection() {
    const [collectionData, setCollectionData] = useState()
    const [collectionName, setCollectionName] = useState("")
    const currentUser = useSelector((state) => state.user.currentUser)
    const TOKEN = currentUser.token
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    axios.defaults.headers.common["Accept"] = "application/json"


    const ClickHandler = async (e) => {
        e.preventDefault()
        console.log(collectionName)
        console.log(TOKEN)
        await axios.post("https://ecommerce-backend-i0y1.onrender.com/api/v1/collection/createCollection", {name: collectionName})
        setCollectionName("")
        preload()
        
    }

    const deleteButton = async(Id) => {
        await axios.delete(`https://ecommerce-backend-i0y1.onrender.com/api/v1/collection/deleteCollection/${Id}`)
        preload()
    }

    const preload = () => {
        getAllCollections().then(data => {
            setCollectionData(data.collections)
        })
    }

    useEffect(() => {
        preload()
    }, [collectionName])

    return (
        <div className=' ml-0 lg:ml-72 mt-16 flex flex-col items-center py-4 '>
        <h1 className='text-lg font-bold'>Collections</h1>
            <div className='flex flex-col sm:flex-row items-center mt-8'>
                <label>Collection Name:</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 ml-2 mt-4 sm:mt-0" type="text" placeholder="Collection Name.." value={collectionName} onChange={(e)=>{
                    setCollectionName(e.target.value)
                }} />
                <button onClick={ClickHandler} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mt-4 sm:mt-0">Add Category</button>
            </div>
            <div className='mt-8'>
            {
                collectionData && collectionData.map((cate, index)=>(
                    <div key={index} className='flex flex-row items-center justify-between p-4 w-60 bg-white border-b dark:bg-gray-900 dark:border-gray-700 mb-3 shadow-lg'>
                    <h3>{cate.name}</h3>
                    <div className='cursor-pointer' onClick={deleteButton.bind(this, cate._id)}  >
                    <BsTrashFill color="#E21717"/>
                    </div>
                    </div> 
                ))
            } 
            </div>
        </div>
      )
}

export default Collection