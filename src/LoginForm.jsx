import React, { useState } from 'react'
import './App.css'
import AuthService from './services/auth'
import md5 from 'md5'

const LoginForm = ({ currentUser, setCurrentUser }) => {

    // Login lomakkeen kenttiä vastaavat statet
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authenticate = (event) => {
        event.preventDefault()

        const userForAuth = {
            username: username,
            password: md5(password)
        }

        console.log(userForAuth)

        AuthService
            .authenticate(userForAuth)
            .then(response => {

                if (response.status === 200) {
                    // Selaimen localstorage saa avain-arvo parin kirjautuneelle käyttäjälle:
                    localStorage.setItem(currentUser, response.data)

                    // Asetetaan käyttäjä stateen
                    setCurrentUser(response.data)

                }

            })
            .catch(error => {
                alert(error)
            })

    }

    if (!currentUser) {
        return (

            <form onSubmit={authenticate}>
                <label>Username</label>
                <input type="text" onChange={({ target }) => setUsername(target.value)} />
                <label>Password</label>
                <input type="password" onChange={({ target }) => setPassword(target.value)} />
                <button type="submit">Login</button>
                <button>Cancel</button>
            </form>
        )
    }

    else {
        return (

            <div>
                <p>`Logged in as ${currentUser.username}`</p>
            </div>
        )
    }
}

export default LoginForm
