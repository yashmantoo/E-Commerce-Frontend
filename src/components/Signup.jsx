import React, { useState } from "react"
import { publicRequest } from "../apiRequests"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Signup(){
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        loading: false
    }) 

    const handleClick = async() => {
        if(!(userDetails.loading))
        {
            if(userDetails.name && userDetails.email && userDetails.password)
            {
                setUserDetails({
                    ...userDetails,
                    loading: true
                })
                const res = await publicRequest.post("/auth/signup", {name: userDetails.name, email: userDetails.email, password: userDetails.password})
                console.log(res)
                if(res.data.success===true)
                {
                    toast.success("Account created Successfully, try login for more",{
                        position: toast.POSITION.TOP_RIGHT 
                    })
                }
                else{
                    toast.success("Please try again",{
                        position: toast.POSITION.TOP_RIGHT 
                    })
                }
            }
            else
            {
                toast.error("All fields are required !",{
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        }
    }

    return (
        <div className="bg-[#010409] min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="name"
                    placeholder="Full Name"
                    onChange={(e)=>{
                        setUserDetails({
                            ...userDetails,
                            name: e.target.value
                        })
                    }}
                     />
                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email" 
                    onChange={(e)=>{
                        setUserDetails({
                            ...userDetails,
                            email: e.target.value
                        })
                    }}
                    />
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password" 
                    onChange={(e)=>{
                        setUserDetails({
                            ...userDetails,
                            password: e.target.value
                        })
                    }}
                    />
    
                <button
                    type="submit" onClick={handleClick}
                    className="w-full text-center py-3 rounded bg-indigo-500 text-white hover:bg-green-dark focus:outline-none my-1"
                >{userDetails.loading?"Please wait..": "Create Account"}</button>
    
                <div className="text-center text-sm text-grey-dark mt-4">
                    By signing up, you agree to the 
                    <a className="no-underline border-b border-grey-dark text-grey-dark" href="/signup">
                        Terms of Service
                    </a> and 
                    <a className="no-underline border-b border-grey-dark text-grey-dark" href="/signup">
                        Privacy Policy
                    </a>
                </div>
            </div>
    
            <div className="text-white mt-6">
                Already have an account? 
                <a className="no-underline border-b border-blue text-white" href="../login">
                    Log in
                </a>.
            </div>
        </div>
        <ToastContainer/>
    </div>
    )
}
    

export default Signup