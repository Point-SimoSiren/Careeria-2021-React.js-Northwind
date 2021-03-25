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
            username: username,
            //password: md5(password) vaihda kommentit ao. kanssa jos kannassa hashatty salasana
            password: password
        }

        AuthService
            .authenticate(userForAuth)
            .then(response => {

                localStorage.setItem('user', response.username)
                localStorage.setItem('token', response.token)

                // Asetetaan käyttäjä stateen
                setCurrentUser(response.username)

            })
            .catch(error => {
                alert(error)
            })
    }

    const logout = () => {
        localStorage.clear()
        setCurrentUser(null)
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
                    <input className="login-input" value={username} type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)} />

                    <input className="login-input" value={password} type="password" placeholder="password" onChange={({ target }) => setPassword(target.value)} />

                    <button type="submit" className="login-button">Login</button>

                    <p className="cancel-button" onClick={emptyFields}>Empty</p>
                </form>
            </>
        )
    }

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
