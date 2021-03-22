import axios from 'axios'

const url = "https://localhost:5001/nw/authenticate"

const authenticate = (userForAuth) => {
    const request = axios.get(url, userForAuth)
    return request.then(response => response.data)
}

export default { authenticate }