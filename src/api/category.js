import axios from './index'

class CategoryService {
    getAll = () => {
        return axios.get('/category')
    }

    add = data => {
        return axios.post('/category',data)
    }

    update = data => {
        return axios.put('/category',data)
    }


    delete = id => {
        return axios.delete(`/category/${id}`)
    }
}

export default new CategoryService()