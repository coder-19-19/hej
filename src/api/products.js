import axios from './index'

class ProductService {
    getAll = (params) => {
        return axios.get('/product', {params})
    }

    add = data => {
        return axios.post('/product',data)
    }

    update = data => {
        return axios.put('/product',data)
    }


    delete = id => {
        return axios.delete(`/product/${id}`)
    }
}

export default new ProductService()