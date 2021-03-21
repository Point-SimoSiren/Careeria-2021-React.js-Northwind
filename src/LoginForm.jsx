import React, { useState } from 'react'
import '../App.css'
import AuthService from '../services/auth'
import md5 from 'md5'

const LoginForm = ({ setMessage, setShowMessage, setIsPositive, isLoggedIn, setIsLoggedIn
}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authenticate = (event) => {
        event.preventDefault()

        var userToAuth = {
            username: username,
            password: md5(password) // Tässä tehdään myös hashays
            // Algoritmi on sama kuin käyttäjien luonnissa, jolloin tieto täsmää kantaan
        }

        console.log(userToAuth)

        AuthService
            .authenticate(userToAuth)
            .then(response => {

                if (response.status === 200) {
                    localStorage.setItem(user, response.data.user)

                    setMessage(`Tervetuloa ${user.username}`)
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

        setIsLoggedIn(true)

    }

    {
        isLoggedIn &&
            <form onSubmit={authenticate}>
                <label>Username</label>
                <input type="text" />
                <label>Password</label>
                <input type="text" />
                <button type="submit">Login</button>
                <button>Cancel</button>
            </form>

    }
}

export default LoginForm
