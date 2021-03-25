import React, { useState } from 'react'
import './App.css'
import AuthService from './services/auth'
import md5 from 'md5'

const LoginForm = ({ currentUser, setCurrentUser }) => {

    // Login lomakkeen kenttiä vastaavat statet
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Näytetäänkö pelkkä komponentti vai nappi jonka takana komponentti aukeaa
    const [näytetäänkö, setNäytetäänkö] = useState(false)


    // Login napin painallus ajaa tämän:

    const authenticate = (event) => {
        event.preventDefault()

        const userForAuth = {
            username: username,
            password: password

        }

        console.log(userForAuth)

        AuthService
            .authenticate(userForAuth)
            .then(promise => {

                if (promise.status === 200) {
                    // Selaimen localstorage saa avain-arvo parin kirjautuneelle käyttäjälle:
                    localStorage.setItem('user', promise.data)
                    console.log(promise.data)
                    // Asetetaan käyttäjä stateen
                    setCurrentUser(promise.data)

                }

            })
            .catch(error => {
                alert(error)
            })

    }

    // Empty napin painallus ajaa tämän
    const emptyFields = () => {
        setPassword('')
        setUsername('')
    }

    if (!currentUser && näytetäänkö) {

        return (
            <>
                <form className="login-form" onSubmit={authenticate}>

                    <input className="login-input" value={username} type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)} />

                    <input className="login-input" value={password} type="password" placeholder="password" onChange={({ target }) => setPassword(target.value)} />

                    <button type="submit" className="login-button">Login</button>

                    <button className="cancel-button" onClick={emptyFields}>Empty</button>

                </form>


            </>
        )
    }

    else if (currentUser && näytetäänkö) {
        return (

            <div>
                <nobr>`Logged in as ${currentUser.username}`</nobr>
            </div>
        )
    }

    else {
        return (

            <button onClick={() => setNäytetäänkö(true)}>Login</button>
        )
    }

}

export default LoginForm
