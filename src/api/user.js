import axios from './index'

class UserService {
    login = data => {
        return axios.post('/auth/login',data)
    }
    addRole = data => {
        return axios.put('/user-role',data)
    }
    getAll = () => {
        return axios.get('/user')
    }
    getUser = id => {
        return axios.get('/user/' + id)
    }
    getRoles = () => {
        return axios.get('/role')
    }
}

export default new UserService()
