import React, { useState } from 'react'
import './App.css'
import CustomerList from './customers/CustomerList'
import ProductList from './products/ProductList'
import LoginList from './logins/LoginList'
import EmployeeList from './employees/EmployeeList'
import Kello from './Kello'
import Homepage from './Homepage'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

  const [clock, setClock] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <marquee><h2 onClick={() => setClock(!clock)}>Northwind Traders Limited</h2></marquee>
      </header>

      <Router>

        <Navbar bg="dark" variant="dark">
          <Link to={'/'} className='nav-link'>Home</Link>

          <Nav className="mr-auto">
            <Link to={'/Customers'} className='nav-link'>Customers</Link>
            <Link to={'/Logins'} className='nav-link'>Logins</Link>

            <Link to={'/Products'} className='nav-link'>Products</Link>
            <Link to={'/Employees'} className='nav-link'>Employees</Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route path='/Customers' component={CustomerList} />
          <Route path='/Logins' component={LoginList} />
          <Route path='/Products' component={ProductList} />
          <Route path='/Employees' component={EmployeeList} />
          <Route path='/' component={Homepage} />
        </Switch>

      </Router>

      {clock && <Kello koko={400} />}

    </div >
  )
}

export default App
