import React, { useState } from 'react'
import '../App.css'
import LoginService from '../services/login'
import md5 from 'md5'

const LoginAdd = ({ setLisäystila, setLogins, logins, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset, id:tä ei anneta vaan tietokanta luo sen

    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('') // Varmistusta varten

    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')

    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(0) // Numeroarvo alustukseen!

    // Tokenia ei lisätä, koska se on taulussa nullina aina.
    // Token on kirjautumistoimintoa varten, jotta sen voi liittää login olion
    // ominaisuudeksi kun kirjautuminen on onnistunut.

    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitCustomer = (event) => {
        event.preventDefault()

        if (newPassword !== passwordAgain) {

            setNewPassword('')
            setPasswordAgain('')
            return (alert('Salasanat eivät täsmänneet.'))
        }

        var newLogin = {
            username: newUsername,
            password: md5(newPassword), // Tässä tehdään hashays. Teithän "npm install md5"
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId) // täytyy näköjään väkisin parseroida
        }

        console.log(newLogin)

        LoginService
            .create(newLogin)
            .then(response => {

                if (response.status === 200) {
                    setLogins(logins.concat(newLogin))

                    setMessage(`Lisätty ${newLogin.username}`)
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
            setLisäystila(false)
        }, 500
        )

    }
    // Komponentti palauttaa käyttöliittymään form elementin
    // Required kaikissa pakollisissa kentissä, ja email tyyppi emailissa
    // Password tyyppi salasanassa ja salasanan "again" varmennuksessa

    return (
        <form onSubmit={submitCustomer}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set kyseinen state hookia parametrina target.value, eli se teksti mitä on kirjoitettu */}

            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} required />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} required />
            </div>
            <div>
                <input type="password" value={passwordAgain} placeholder="Re-enter password"
                    onChange={({ target }) => setPasswordAgain(target.value)} required />
            </div>
            <div>
                <input type="text" value={newFirstname} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Lastname"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <p>Access level ID</p>
                <input type="number" value={newAccesslevelId} placeholder="Access level ID"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>

            <button className="nappi" type="submit" style={{ background: 'green' }}>Create</button>

            <button className="nappi" onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default LoginAdd
