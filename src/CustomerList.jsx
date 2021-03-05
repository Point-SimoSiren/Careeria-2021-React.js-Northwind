import React, { useState, useEffect } from 'react'
import './App.css'
import CustomerService from './services/customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [lisäysTila, setLisäystila] = useState(false)

    useEffect(() => {
        CustomerService
            .getAll()
            .then(data => {
                //console.log(data)
                setCustomers(data)
            })
    }, [])

    return (
        <>
            <h1 style={{ cursor: 'pointer' }} onClick={() => setNäytetäänkö(!näytetäänkö)}>customers <button onClick={() => setLisäystila(true)}>Add new</button></h1>

            {
                customers && näytetäänkö === true && lisäysTila === false && customers.map(customer =>
                    <Customer customer={customer} />
                )
            }

            { !customers && <p>Loading...</p>}

            {lisäysTila === true && <CustomerAdd setLisäystila={setLisäystila} />}

        </>
    )
}

export default CustomerList