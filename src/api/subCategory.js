import axios from './index'

class SubCategoryService {
    getAll = () => {
        return axios.get('/subcategory')
    }

    add = (data,setLoad) => {
        return axios.post('/subcategory',data,{
            onUploadProgress: progressEvent => {
                setLoad((progressEvent.loaded / progressEvent.total) * 100)
            }
        })
    }

    update = (data,setLoad) => {
        return axios.put('/subcategory',data,{
            onUploadProgress: progressEvent => setLoad((progressEvent.loaded / progressEvent.total) * 100)
        })
    }

    delete = id => {
        return axios.delete(`/subcategory/${id}`)
    }
}

export default new SubCategoryService()