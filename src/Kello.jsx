import React, { useEffect, useState } from 'react'
import Clock from 'react-clock'
import './App.css'
import 'react-clock/dist/Clock.css'

const Kello = ({ koko }) => {
    const [value, setValue] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(
            () => setValue(new Date()),
            1000
        )

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className="kello">

            <Clock value={value} size={koko} />

        </div>
    )
}

export default Kello