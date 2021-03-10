import React, { useState } from 'react'
import './App.css'

const Laskuri = () => {

    const [luku, setLuku] = useState(0)

    return (
        <>
            <h2>{luku}</h2>

            <button onClick={() => setLuku(luku + 1)}>+ 1</button>

            <button onClick={() => setLuku(luku - 1)}>- 1</button>

            <button onClick={() => setLuku(0)}>Nollaa laskuri</button>
        </>
    )
}

export default Laskuri
