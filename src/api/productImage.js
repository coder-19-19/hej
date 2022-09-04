import axios from './index'

class ProductImageService {
    getAll = () => {
        return axios.get('/product-image')
    }

    add = (data,productId) => {
        return axios.post('/product-image/?productId=' + productId,data)
    }
    addMany = (data,productId) => {
        return axios.post('/product-image/add-many/?productId=' + productId,data)
    }

    update = data => {
        return axios.put('/product-image',data)
    }


    delete = id => {
        return axios.delete(`/product-image/${id}`)
    }
}

export default new ProductImageService()