import React, { useState, useEffect } from 'react'
import './App.css'
import Kello from './Kello'

const Homepage = () => {

    return (
        <>

            <Kello koko={300} />
            <div className="homepage-header-bg">
                <marquee><h1 className="homepage-header">Welcome to Northwind React Application</h1></marquee>
            </div>
        </>
    )
}

export default Homepage