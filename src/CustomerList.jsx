import React, { useState, useEffect } from 'react'
import './App.css'
import CustomerService from './services/customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = ({ setMessage, setShowMessage, setIsPositive }) => {

    const [customers, setCustomers] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [search, setSearch] = useState("")
    const [lisäysTila, setLisäystila] = useState(false)

    useEffect(() => {
        CustomerService
            .getAll()
            .then(data => {
                console.log(data)
                setCustomers(data)
            })
    }, [näytetäänkö])

    //Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setNäytetäänkö(true)
        setSearch(event.target.value.toLowerCase())
    }

    const handleDeleteClick = id => {
        CustomerService.remove(id)
            .then(promise => {
                setCustomers(customers.filter(filtered => filtered.id !== id))
                if (promise.status === 200) {
                    alert("Asiakas poistettu")
                }
                setNäytetäänkö(false)
                setNäytetäänkö(true)
            }
            )
    }


    return (
        <>
            <h1 style={{ cursor: 'pointer' }}
                onClick={() => setNäytetäänkö(!näytetäänkö)}> customers
            <button onClick={() => setLisäystila(true)}>Add new</button>
            </h1>

            {!lisäysTila &&
                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />
            }

            {
                customers && näytetäänkö === true && lisäysTila === false && customers.map(customer => {
                    const lowerCaseName = customer.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <Customer key={customer.customerId} customer={customer}
                                handleDeleteClick={handleDeleteClick} />
                        )
                    }
                }
                )
            }

            { !customers && <p>Loading...</p>}

            {lisäysTila && <CustomerAdd setLisäystila={setLisäystila} customers={customers} setCustomers={setCustomers} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />}

        </>
    )
}

export default CustomerList