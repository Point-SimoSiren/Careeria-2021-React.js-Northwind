import React, { useState, useEffect } from 'react'
import './App.css'
import CustomerService from './services/customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [search, setSearch] = useState("")
    const [lisäysTila, setLisäystila] = useState(false)

    useEffect(() => {
        CustomerService
            .getAll()
            .then(data => {
                //console.log(data)
                setCustomers(data)
            })
    }, [])

    //Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        console.log(search)
        setNäytetäänkö(true)
        setSearch(event.target.value.toLowerCase())
    }

    return (
        <>
            <h1 style={{ cursor: 'pointer' }}
                onClick={() => setNäytetäänkö(!näytetäänkö)}> customers
            <button onClick={() => setLisäystila(true)}>Add new</button>
            </h1>


            <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />

            {
                customers && näytetäänkö === true && lisäysTila === false && customers.map(customer => {
                    const lowerCaseName = customer.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <Customer key={customer.customerId} customer={customer} />
                        )
                    }
                }
                )
            }

            { !customers && <p>Loading...</p>}

            {lisäysTila === true && <CustomerAdd setLisäystila={setLisäystila} />}

        </>
    )
}

export default CustomerList