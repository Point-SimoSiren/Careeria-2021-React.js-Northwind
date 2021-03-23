import axios from 'axios'

const baseUrl = "https://localhost:5001/nw/logins"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newLogin => {
    return axios.post(baseUrl, newLogin)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)



export default { getAll, create, remove }