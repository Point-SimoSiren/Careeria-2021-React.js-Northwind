import axios from 'axios'

const baseUrl = "https://localhost:5001/nw/customers"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}



export default { getAll }