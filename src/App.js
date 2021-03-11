import React, { useState } from 'react'
import './App.css'
import CustomerList from './CustomerList'
import Kello from './Kello'
import Message from './Message'

const App = () => {

  const [clock, setClock] = useState(false)

  const [showMessage, setShowMessage] = useState(false)
  const [isPositive, setIsPositive] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <h2 onClick={() => setClock(!clock)}>Northwind Traders Limited</h2>
      </header>

      { showMessage &&
        <Message message={message} isPositive={isPositive} />
      }

      {clock && <Kello koko={500} />}

      {!clock && <CustomerList setShowMessage={setShowMessage} setIsPositive={setIsPositive}
        setMessage={setMessage} />}

    </div>
  )
}

export default App
