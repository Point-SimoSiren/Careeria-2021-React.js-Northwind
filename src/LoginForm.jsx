import React, { useState } from 'react'
import './App.css'
import AuthService from './services/auth'
import md5 from 'md5'

const LoginForm = ({ currentUser, setCurrentUser }) => {

    // Login lomakkeen kenttiä vastaavat statet
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    // Login napin painallus ajaa tämän:

    const authenticate = (event) => {
        event.preventDefault()

        const userForAuth = {
            "username": username,
            "password": password

        }

        console.log(userForAuth)

        AuthService
            .authenticate(userForAuth)
            .then(response => {

                if (response.status === 200) {
                    // Selaimen localstorage saa avain-arvo parin kirjautuneelle käyttäjälle:
                    localStorage.setItem('user', response.data)
                    console.log(response.data)
                    // Asetetaan käyttäjä stateen
                    setCurrentUser(response.data)

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

    if (!currentUser) {

        return (
            <>
                <form className="login-form" onSubmit={authenticate}>

                    <input className="login-input" type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)} />

                    <input className="login-input" type="password" placeholder="password" onChange={({ target }) => setPassword(target.value)} />

                    <button className="login-button" type="submit">Login</button>

                    <button className="cancel-button" onClick={emptyFields}>Empty</button>

                </form>


            </>
        )
    }

    else {
        return (

            <div>
                <nobr>`Logged in as ${currentUser.username}`</nobr>
            </div>
        )
    }
}

export default LoginForm
