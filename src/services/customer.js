import axios from 'axios'

const baseUrl = "https://localhost:5001/nw/customers"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const create = newCustomer => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newCustomer, config)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = changedCustomer => {
    return axios.put(`${baseUrl}/${changedCustomer.customerId}`, changedCustomer)
}


export default { getAll, create, remove, update, setToken }