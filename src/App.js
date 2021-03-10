import React, { useState } from 'react'
import './App.css'
import CustomerList from './CustomerList'
import Kello from './Kello'

const App = () => {

  const [clock, setClock] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h2 onClick={() => setClock(!clock)}>Northwind Traders Limited</h2>
      </header>

      {clock && <Kello koko={500} />}

      {!clock && <CustomerList />}

    </div>
  )
}

export default App
