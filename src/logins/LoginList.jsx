import React, { useState, useEffect } from 'react'
import '../App.css'
import LoginService from '../services/login'
import Login from './Login'
import LoginAdd from './LoginAdd'
import Message from '../Message'

const LoginList = () => {

    const [logins, setLogins] = useState([]) // taulukollinen login olioita
    const [lisäysTila, setLisäystila] = useState(false)

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        LoginService
            .getAll()
            .then(data => {
                setLogins(data)
            })
    }, [lisäysTila])

    // Tämä ajetaan kun ollaan poistamassa asiakasta
    const handleDeleteClick = id => {

        //Kaivetaan esiin koko login olio jotta alertissa voidaan näyttää companyName id:n sijaan
        const login = logins.find(login => login.loginId === id)

        // Poiston varmistus kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${login.username}:n pysyvästi?`)

        if (confirm) {

            LoginService.remove(id)
                .then(response => {

                    if (response.status === 200) {
                        // Poistetaan login statesta
                        setLogins(logins.filter(filtered => filtered.loginId !== id))

                        setMessage(`${login.username}:n poisto onnistui!`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000
                        )
                    }

                })

                .catch(error => {
                    console.log(error)
                    setMessage(`Tapahtui virhe: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000
                    )
                })
        }
        else { // JOS KÄYTTÄJÄ EI VAHVISTANUT POISTOA:
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000
            )
        }
    }

    // RETURN ON AINA SE OSA JOKA RENDERÖIDÄÄN RUUDULLE

    // Jos logineja ei ole ehtinyt tulla kannasta stateen
    if (!logins) {
        return (<>
            <h1>Logins</h1>
            { showMessage &&
                <Message message={message} isPositive={isPositive} />
            }
            <p>Loading...</p>
        </>)
    }

    // Jos statessa on jo kannasta saapuneet loginit ja lisäystilakin on pois päältä
    if (!lisäysTila && logins) {
        return (
            <>
                <h1><nobr> Logins</nobr>

                    <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>

                <table className="loginsListTable">
                    <thead>
                        <th>Username</th><th>Firstname</th><th>Lastname</th>
                        <th>Email</th><th></th>
                    </thead >
                    <tbody>
                        {logins.map(login =>

                            <Login key={login.loginId} login={login}
                                handleDeleteClick={handleDeleteClick} />
                        )
                        }

                    </tbody>
                </table >
            </>

        )
    }

    if (lisäysTila) {
        return (
            <LoginAdd setLisäystila={setLisäystila} logins={logins} setLogins={setLogins} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />
        )
    }


}
export default LoginList
