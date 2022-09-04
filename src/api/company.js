import axios from './index'

class CompanyService {
    getAll = () => {
        return axios.get('/company')
    }

    add = data => {
        return axios.post('/company',data)
    }

    update = data => {
        return axios.put('/company',data)
    }
}

export default new CompanyService()