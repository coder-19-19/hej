import axios from "./index";

class ConstantsService {

    addBanner = (data) => {
        return axios.post(`main-banner`,data)
    }

    getBanners = () =>{
        return axios.get('main-banner')
    }

    deleteBanner = id => {
        return axios.delete('main-banner/' + id)
    }

    updateBanner = id => {
        return axios.put('main-banner/status/' + id)
    }

    getConstants = () => {
        return axios.get('constant')
    }

    updateConstants = (data) => {
        return axios.put('constant',data)
    }
}

export default new ConstantsService()