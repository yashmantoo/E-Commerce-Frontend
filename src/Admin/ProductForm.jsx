import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { getAllCollections } from '../pages/apiHelper'
import { useSelector } from 'react-redux'

function ProductForm({setFlag}) {
    const currentUser = useSelector((state) => state.user.currentUser)
    const TOKEN = currentUser.token
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`
    axios.defaults.headers.common["Content-Type"] = "multipart/form-data, appication/json   "

    const [imageSrc, setImageSrc] = useState()
    const [status, setStatus] = useState({
        loading: false,
        error: false,
        success: false
    })
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        collectionId: ""
    })
    const [collectionData, setCollectionData] = useState()

    const handleImage = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            image: e.target.files[0]
        })
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }   

    const submitForm = async(e) => {
        e.preventDefault()
        if(!status.loading)
        {
            setStatus({
                ...status,
                loading: true
            })
            console.log(values)
            const res = await axios.post("https://ecommerce-backend-i0y1.onrender.com/api/v1/product/addProduct", values)
            if(!res.data.success)
            {
                setStatus({...status, error:true})
            }
            else{
                setStatus({...status, success: true})
                setFlag(false)
            }
        }
    }

    const preload = () => {
        getAllCollections().then(data => {
            setCollectionData(data.collections)
        })
    }

    useEffect(() => {
        preload()
    }, [])

    return (
        <div className='absolute top-[15%] md:right-[50%] md:left-[50%]  z-10 bg-white p-4 w-max  border border-black  rounded-xl'>
            <div className='flex flex-col items-center justify-start '>
            <img alt='product' className='w-40 ' src={imageSrc}></img>
            <input type="file"  accept='image'  onChange={handleImage}></input>
            </div>
            <div>
                <div className='flex flex-row justify-between items-center'>
                <label className='block text-sm font-medium text-gray-900 dark:text-white'>Product Name:</label>
                <input type="text" placeholder="Product Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 ml-2 w-auto" onChange={(e)=>{
                  setValues({
                    ...values,
                    name: e.target.value
                  })
                }} ></input>
                </div>
                <div className='flex flex-row justify-between items-center mt-4'>
                <label className='block text-sm font-medium text-gray-900 dark:text-white'>Category:</label>
                  <select placeholder='Product Category' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 ml-2" onChange={(e)=>{
                    setValues({
                      ...values,
                      collectionId: e.target.value
                    })
                  }}>
                    <option>Select</option>
                    {
                      collectionData && collectionData.map((cate, index)=>(
                        <option key={index} value={cate._id}>{cate.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='flex flex-row justify-between items-center mt-4'>
                <label className='block text-sm font-medium text-gray-900 dark:text-white'>Product Price:</label>
                <input type="number" placeholder="Product Price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 ml-2" onChange={(e)=>{
                  setValues({
                    ...values,
                    price: e.target.value
                  })
                }}></input>
                </div>
                <div className='flex flex-row justify-between items-center mt-4'>
                <label className='block text-sm font-medium text-gray-900 dark:text-white'>Description:</label>
                <textarea type="text" placeholder="Product Description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 ml-2" onChange={(e)=>{
                  setValues({
                    ...values,
                    description: e.target.value
                  })
                }} ></textarea>
                </div>
                <div className='flex flex-row justify-between items-center mt-4'>
                <label className='block text-sm font-medium text-gray-900 dark:text-white'>Stocks:</label>
                <input type="number" placeholder="Product Stock" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2 ml-2" onChange={(e)=>{
                  setValues({
                    ...values,
                    stock: e.target.value
                  })
                }} ></input>
                </div>
            </div>
            <div className='mt-4'>
                <button onClick={submitForm} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2">{status.loading? "Please wait..": "Add"}</button>
                <h3 className='text-[#E21717]'>{status.error? "Failed to create product": ""}</h3>
            </div>
        </div>
      )
}

export default ProductForm