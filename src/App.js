import React, { useState, useEffect } from 'react'
import './App.css'
import CustomerList from './customers/CustomerList'
import ProductList from './products/ProductList'
import LoginList from './logins/LoginList'
import EmployeeList from './employees/EmployeeList'
import Homepage from './Homepage'

import LoginForm from './LoginForm'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from './Message'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

  // State kirjautuneesta käyttäjästä
  const [currentUser, setCurrentUser] = useState()

  // Statet Login aiheisesta Messagen näyttämisestä
  const [showMessage, setShowMessage] = useState(false)
  const [isPositive, setIsPositive] = useState(true)
  const [message, setMessage] = useState('')


  // use effectissä tarkistetaan onko selaimen local storagessa user tietoa vanhastaan
  useEffect(() => {
    const userFromLS = localStorage.getItem('user')
    if (userFromLS) {
      setCurrentUser(userFromLS)
    }
  }, []
  )

  if (currentUser) {
    return (
      <div className="App">
        <header className="App-header">
          <marquee><h2>Northwind Traders Limited</h2></marquee>
        </header>

        <Router>
          <Navbar bg="dark" variant="dark">
            <Link to={'/'} className='nav-link'>Home</Link>

            <Nav className="mr-auto">
              <Link to={'/Customers'} className='nav-link'>Customers</Link>
              <Link to={'/Logins'} className='nav-link'>Logins</Link>

              <Link to={'/Products'} className='nav-link'>Products</Link>
              <Link to={'/Employees'} className='nav-link'>Employees</Link>

              <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} setMessage={setMessage} isPositive={isPositive} setShowMessage={setShowMessage} />

            </Nav>
          </Navbar>

          {showMessage &&
            <Message message={message} isPositive={isPositive} />
          }

          <Switch>
            <Route path='/Customers' component={CustomerList} />
            <Route path='/Logins' component={LoginList} />
            <Route path='/Products' component={ProductList} />
            <Route path='/Employees' component={EmployeeList} />
            <Route path='/' component={Homepage} />
          </Switch>

        </Router>

      </div >
    )
  }

  else {
    return (
      <div className="App">
        <header className="App-header">
          <marquee><h2>Northwind Traders Limited</h2></marquee>
        </header>

        <Router>

          <Navbar bg="dark" variant="dark">
            <Link to={'/'} className='nav-link'>Home</Link>

            <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser}
              setMessage={setMessage} setIsPositive={setIsPositive}
              setShowMessage={setShowMessage} />
          </Navbar>

          {showMessage &&
            <Message message={message} isPositive={isPositive} />
          }

          <Switch>
            <Route path='/' component={Homepage} />
          </Switch>

        </Router>
      </div >
    )
  }

}

export default App
