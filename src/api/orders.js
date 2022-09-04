import axios from './index'

class OrderService {
    getAll = () => {
        return axios.get('/order')
    }

    updateStatus = id => {
        return axios.put('/order/status/' + id)
    }
}

export default new OrderService()