import React, { useState } from 'react'
import './App.css'
import AuthService from './services/auth'
import md5 from 'md5'

const LoginForm = ({ currentUser, setCurrentUser, setMessage,
    setIsPositive, setShowMessage }) => {

    // Login lomakkeen kenttiä vastaavat statet
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Login napin painallus ajaa tämän:
    const authenticate = (event) => {
        event.preventDefault()

        const userForAuth = {
            username: username,
            //password: md5(password) vaihda kommentit ao. kanssa jos kannassa hashatty salasana
            password: password
        }

        AuthService // Käytetään AuthServicen metodia authenticate()
            .authenticate(userForAuth)
            .then(response => {

                //Palvelimen vastauksena tullut käyttäjä talletetaan selaimen local storageen
                //Päätetään tallettaa vain 2 tietoa:
                localStorage.setItem('user', response.username)
                localStorage.setItem('token', response.token)

                // Asetetaan käyttäjänimi currentUser -stateen, jota säilytetään App.js:ssä
                setCurrentUser(response.username)

                // Annetaan ilmoitus käyttäen Message komponenttia, joka sijaitsee nyt tämän
                // viestin näyttämiseksi App.js komponentissa navbarin alapuolella.
                // Login form on niin pieni ja nurkassa että tämän sisällä ei voi näyttää messagea.

                setMessage(`Tervetuloa ${response.username}`)
                setIsPositive(true)
                setShowMessage(true)

                // Message pois pienen viiveen jälkeen:
                setTimeout(() => {
                    setShowMessage(false)
                }, 4000

                )

            })

            .catch(error => {
                setMessage(`Error ${error}`)
                setIsPositive(false)  // Erroreille punainen viesti
                setShowMessage(true)

                // Message pois pienen viiveen jälkeen:
                setTimeout(() => {
                    setShowMessage(false)
                }, 4000

                )
            })
    }

    // Tämä funktio ajetaan kun tehdään Logout
    const logout = () => {
        localStorage.clear()
        setCurrentUser(null)

        // Message
        setMessage('Kirjauduit ulos onnistuneesti')
        setIsPositive(true)
        setShowMessage(true)

        // Message pois pienen viiveen jälkeen:
        setTimeout(() => {
            setShowMessage(false)
        }, 4000

        )

    }

    // Empty napin painallus ajaa tämän
    const emptyFields = () => {
        setPassword('')
        setUsername('')
    }

    // Jos App.js:n useEffect funktio ei löydä local storagesta käyttäjää, tilanne on tämä:
    if (!currentUser) {
        return (
            <>
                <form className="login-form" onSubmit={authenticate}>
                    <input className="login-input" value={username} type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)} />

                    <input className="login-input" value={password} type="password" placeholder="password" onChange={({ target }) => setPassword(target.value)} />

                    <button type="submit" className="login-button">Login</button>

                    <p className="cancel-button" onClick={emptyFields}>Empty</p>
                </form>
            </>
        )
    }
    // Muussa tapauksessa:
    else if (currentUser) {
        return (

            <div className="käyttäjä-tieto">
                <nobr>{`Logged in as ${currentUser}`}</nobr>
                <button className="cancel-button" onClick={logout}>Logout</button>
            </div>
        )
    }

}

export default LoginForm
