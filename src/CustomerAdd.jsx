import React, { useState } from 'react'
import './App.css'
import CustomerService from './services/customer'

const CustomerAdd = ({ setLisäystila, setCustomers, customers, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset

    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')

    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')

    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')

    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitCustomer = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }

        CustomerService
            .create(newCustomer)
            .then(response => {

                if (response.status === 200) {
                    setCustomers(customers.concat(newCustomer))
                    setMessage(`Lisätty ${newCustomer.companyName}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000
                    )
                }

            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 7000
                )
            })


        setTimeout(() => {
            setLisäystila(false)
        }, 500
        )

    }
    // Komponentti palauttaa käyttöliittymään form elementin
    // Lisätty required 2 ensimmäiseen inputiin

    return (
        <form onSubmit={submitCustomer}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            <div>
                <input type="text" value={newCustomerId} placeholder="ID with 5 capital letters" maxLength="5" minLength="5"
                    onChange={({ target }) => setNewCustomerId(target.value)} required />
            </div>
            <div>
                <input type="text" value={newCompanyName} placeholder="Company name"
                    onChange={({ target }) => setNewCompanyName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newContactName} placeholder="Contact name"
                    onChange={({ target }) => setNewContactName(target.value)} />
            </div>
            <div>
                <input type="text" value={newContactTitle} placeholder="Contact title"
                    onChange={({ target }) => setNewContactTitle(target.value)} />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <input type="text" value={newAddress} placeholder="Address"
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="City"
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
                <input type="text" value={newPostalCode} placeholder="Postal code"
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            <div>
                <input type="text" value={newPhone} placeholder="Phone"
                    onChange={({ target }) => setNewPhone(target.value)} />
            </div>
            <div>
                <input type="text" value={newFax} placeholder="Fax"
                    onChange={({ target }) => setNewFax(target.value)} />
            </div>

            <button type="submit" style={{ background: 'green' }}>Create</button>

            <button onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default CustomerAdd
