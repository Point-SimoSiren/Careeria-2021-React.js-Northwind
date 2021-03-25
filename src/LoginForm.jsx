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
            .then(response => {

                localStorage.setItem('user', response.username)
                localStorage.setItem('token', response.token)

                // Asetetaan käyttäjä stateen
                setCurrentUser(response.username)
                setNäytetäänkö(true)

            })
            .catch(error => {
                alert(error)
            })

    }

    const logout = () => {
        localStorage.clear()
        window.location.reload()
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

                    <button className="cancel-button" onClick={() => setNäytetäänkö(false)}>Hide</button>

                </form>


            </>
        )
    }

    else if (currentUser && näytetäänkö) {
        return (

            <div>
                <p>`Logged in as ${currentUser.username}`</p>
                <button className="cancel-button" onClick={logout}>Logout</button>
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
