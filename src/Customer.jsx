import React, { useState } from 'react'
import './App.css'

const Customer = ({ customer, handleDeleteClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)

    return (
        <>
            {/* <table>
                <tr><td>
                    <h3 onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
                        {customer.companyName}</h3></td> <td><button onClick={() => handleDeleteClick(customer.customerId)}>Delete</button></td>
                    <td><button>Edit</button></td>
                </tr>
            </table>
           */}
            <h3 onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
                {customer.companyName}<button onClick={() => handleDeleteClick(customer.customerId)}>Delete</button>
                <button>Edit</button></h3>

            {näytäEnemmän && <div className="customerWindow">
                <table>
                    <thead>
                        <tr>
                            <th>Contact person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                </table></div>}
        </>
    )
}

export default Customer