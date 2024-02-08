import React from 'react'
import heroImg from "../assets/heroImg.jpg"
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url("${heroImg}")`}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">For the Musician in you</h1>
          <p className="mb-5">Get the best in line Instruments of your choice at the best prices</p>
          <Link to= "/shop">
            <button  className="btn btn-primary">Get Started</button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default Hero