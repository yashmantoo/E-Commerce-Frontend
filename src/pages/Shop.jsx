import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getAllProducts, getAllCollections, getProductByCollection } from './apiHelper'
import { Link } from 'react-router-dom'



function Shop() {
    const [collections, setCollections] = useState()
    const [productList, setProductList] = useState()
    const [option, setOption] = useState(null)

    const preload = () => {
        getAllCollections().then(data => {
            setCollections(data.collections)
        })
    }

    const Reset = () => {
      setOption(null)
    }
    useEffect(() => {
      preload()
        if(!option)
        {
            getAllProducts().then(data => {
                setProductList(data.products)
            })
        }
        else
        {
            console.log(option)
            getProductByCollection(option).then(data => {
                setProductList(data.products)
            })
        }
    },[option])

    return (
        <div>
            <div className='bg-[#010409]'>
            <Navbar/>
          </div>
          <div className='flex flex-row'>
            <div className='w-1/4 h-screen'>
              <div className='flex flex-col items-start pl-6'>
                <h1 className='font-bold text-md mt-6'>Collections</h1>
                <div>
                {
                  collections && collections.map((cat,index)=>(
                    <div key={index} className="flex items-center ml-2 mt-4">
                      <input  type="checkbox" value={cat._id} checked = {option === cat._id}  onChange={(e) => setOption(e.target.value)}
                        className="checkbox checkbox-primary"  />
                      <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {cat.name}
                      </label>
                    </div>
                  ))
                }
                <button type='reset' className="btn btn-xs btn-outline btn-primary sm:btn-sm md:btn-md mt-4" onClick={Reset}>Revert</button>
                </div>
              </div>
            </div>
            <div className='w-3/4 border-l border-gray-300  bg-[#fff] py-5'>
            <div className='p-2 flex flex-row flex-wrap items-center gap-10'>
             {
            productList && productList.map((prod,index)=>(
                <div key={index}  className=" mb-6 w-72 bg-white shadow-md rounded-xl hover:shadow-xl duration-500 hover:scale-105">
                <Link to={`/product/${prod._id}`}>
            <img  src={prod.photos[0]?.secure_url} alt="Product" className="h-60 w-72 object-scale-down rounded-t-xl" /></Link>
            <div className="px-4 py-3 w-72">
              <p className="text-lg font-bold text-black truncate block capitalize">{prod.name}</p>
              <div className="flex items-center justify-evenly">
                <p className="text-lg font-semibold text-black cursor-auto my-3">₹ {prod.price}</p> 
              </div>
            </div>
        </div>
            ))
        }
        </div>
            </div>
          </div>
        </div>
      )
}

export default Shop