import React, { useState } from 'react'
import '../App.css'
import CustomerService from '../services/customer'

const CustomerEdit = ({ setMuokkaustila, setCustomers, customers, setMessage, setShowMessage,
    setIsPositive, muokattavaCustomer }) => {

    // State määritykset

    const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

    const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState(muokattavaCustomer.city)

    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
    const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä

    const submitCustomer = (event) => {
        event.preventDefault()
        var changedCustomer = {
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
        // Lähetetään servicelle token ennen kuin tehdään update pyyntö serviceen
        const jwt = localStorage.getItem('token')
        CustomerService.setToken(jwt)

        CustomerService
            .update(changedCustomer) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    const id = changedCustomer.customerId

                    // Poistetaan ensin vanha customer statesta
                    setCustomers(customers.filter(filtered => filtered.customerId !== id))

                    // Ja lisätään uudestaan muuttuneilla tiedoilla
                    setCustomers(customers.concat(changedCustomer))

                    setMessage(`Päivitetty ${changedCustomer.companyName}`)
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
            setMuokkaustila(false)
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
                <p>ID: {newCustomerId}</p>

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

            <button className="nappi" type="submit" style={{ background: 'green' }}>Save</button>

            <button className="nappi" onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default CustomerEdit
