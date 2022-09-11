import axios from './index'

class ProductService {
    getAll = (params) => {
        return axios.get('/product/find-all', {params})
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

    getMaterials = () => {
        return axios.get(`/material`)
    }

    addMaterial = data => {
        return axios.post('/material',data)
    }
    deleteMaterial = id => {
        return axios.delete('/material/' + id)
    }
}

export default new ProductService()