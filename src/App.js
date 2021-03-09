import React, { useState } from 'react'
import './App.css'
//import Laskuri from './laskuri'
import CustomerList from './CustomerList'
import Kello from './Kello'

const App = () => {

  const [luku, setLuku] = useState(0)
  const [clock, setClock] = useState(false)

  /*setTimeout(() => {
    setLuku(luku + 1)
  }, 1000
  )*/

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => setClock(!clock)}>Northwind </h1>
      </header>


      {clock && <Kello koko={500} />}

      {!clock && <CustomerList />}


      {/*<Laskuri luku={luku} setLuku={setLuku} />*/}

    </div>
  )
}

export default App
