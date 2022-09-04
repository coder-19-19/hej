import {useEffect, useState} from "react";
import {FcAddImage} from "react-icons/fc";
import ProductImage from "../../../api/productImage";
import {toast} from "react-toastify";

const AddImageModal = ({addModal, setAddModal,fetchImages,setImages}) => {
    const [files, setFiles] = useState([])
    const resetAndCloseForm = () => {
        setFiles([])
        setAddModal(false)
    }
    const addFile = e => {
        const localFiles = e.target.files[0]
        setFiles(prev => ([
            ...prev,
            localFiles
        ]))
    }
    const handleSubmit = async () => {
        const formData = new FormData()
        if(files?.length > 1) {
            files?.map(item => {
                formData.append('files',item)
            })
        }else {
            formData.append('file',files[0])
        }
        const data = await (files?.length > 1 ?  ProductImage.addMany(formData,addModal?.id) : ProductImage.add(formData,addModal?.id))
        fetchImages().then(res => {
            setImages(res?.data?.data)
        })
        resetAndCloseForm()
    }
    const handleDelete = index => {
        setFiles(prev => ([
            ...prev?.filter((item,i) => i !== index)
        ]))
    }
    const handleDeleteFromDataBase = async id => {
        const data = await ProductImage.delete(id)
        setImages(prev => ([
            ...prev?.filter(item => item?.id !== id)
        ]))
        setAddModal(prev => ({
            ...prev,
            productImages:[...prev?.productImages?.filter(item => item?.id !== id)]
        }))
        toast.dark('Uğurla silindi',{
            position:'bottom-left'
        })
    }
    return (
        <div className={`modal fade show ${addModal?.status && 'd-block'}`} role="dialog" tabIndex="-1">
            <div
                className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                role="document">
                <div className="modal-content border-dark outline-dark w-75 p-2">
                    <div className="bg-transparent mb-0 modal-header"><h5
                        className="modal-title font-weight-bold mr-2">Məhsula şəkil et</h5>
                        <button type="button" className="btn btn-outline-danger font-weight-bold"
                                onClick={resetAndCloseForm}>X
                        </button>
                    </div>
                    <div className="pb-3 pt-0 modal-body d-flex flex-column">
                        <div className="mb-2">
                            <label className="d-block" htmlFor="imageUrl">Məhsulun şəklilləri</label>
                            <label style={{cursor: "pointer"}}>
                                <FcAddImage style={{width: "50px", height: "50px"}}/>
                                <input className="form-control-file border-dark d-none" type="file"
                                       name="imageUrl"
                                       id="imageUrl"
                                       accept="image/*"
                                       onChange={addFile}/>
                            </label>
                            <div className="d-flex flex-wrap">
                                {addModal?.productImages?.map((item,index) => (
                                    <div key={index} className="d-flex flex-column">
                                        <img src={process.env.REACT_APP_MEDIA_URL + item?.path} height="100" className="mr-2 mt-2"/>
                                        <button className="btn mt-2 mr-2 btn-danger" onClick={() => handleDeleteFromDataBase(item?.id)}>Sil</button>
                                    </div>
                                ))}
                                {files?.map((item,index) => (
                                    <div key={index} className="d-flex flex-column">
                                        <img src={URL.createObjectURL(item)} height="100" className="mr-2 mt-2"/>
                                        <button className="btn mt-2 mr-2 btn-danger" onClick={() => handleDelete(index)}>Sil</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex justify-content-end mb-1">
                            <button type="submit" className="ms-50 btn btn-outline-secondary mr-2"
                                    onClick={resetAndCloseForm}>İmtina et
                            </button>
                            <button disabled={!files?.length} type="submit" className="ms-50 btn btn-success"
                                    onClick={handleSubmit}>Təsdiqlə
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddImageModal