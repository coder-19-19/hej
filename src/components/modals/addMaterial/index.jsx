import {useState} from "react";
import {toast} from "react-toastify";
import Products from "../../../api/products";

const AddMaterial = ({addModal,setAddModal,fetchMaterial}) => {
    const initialValues = {
        name:'',
        isActive:true
    }
    const [formData,setFormData] = useState(initialValues)

    const resetAndCloseForm = () => {
        setFormData(initialValues)
        setAddModal(false)
    }

    const handleSubmit = async () => {
        try {
            await Products.addMaterial(formData)
            fetchMaterial()
            resetAndCloseForm()
            toast.success('Uğurla əlavə edildi',{
                position:'bottom-left'
            })
        }catch (e) {
            toast.error('Xəta baş verdi',{
                position:'bottom-left'
            })
        }
    }

    return (
        <div className={`modal fade show ${addModal && 'd-block'}`} role="dialog" tabIndex="-1">
            <div
                className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                role="document">
                <div className="modal-content border-dark outline-dark w-50 p-2">
                    <div className="bg-transparent mb-0 modal-header"><h5
                        className="modal-title font-weight-bold mr-2">Material əlavə et</h5>
                        <button type="button" className="btn btn-outline-danger font-weight-bold"
                                onClick={resetAndCloseForm}>X
                        </button>
                    </div>
                    <div className="pb-3 pt-0 modal-body d-flex flex-column">
                        <div className="mb-2">
                            <label className="d-block" htmlFor="name">Materialın adı</label>
                            <input className="form-control border-dark" type="text" name="name"
                                   id="name" value={formData.name}
                                   onChange={(e) => {
                                       setFormData(prevState => ({
                                           ...prevState,
                                           name:e.target.value
                                       }))
                                   }}/>
                        </div>
                        <div className="mb-2"><span>Status:</span>
                            <label className="switch">
                                <input name="isActive" type="checkbox" value={formData.isActive}
                                       defaultChecked={formData.isActive} onChange={(e) => {
                                           setFormData(prevState => ({
                                               ...prevState,
                                               isActive: e.target.checked ? true : false
                                           }))
                                }}
                                       className="success"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex justify-content-end mb-1">
                            <button type="submit" className="ms-50 btn btn-outline-secondary mr-2"
                                    onClick={resetAndCloseForm}>İmtina et
                            </button>
                            <button type="submit" className="ms-50 btn btn-success"
                                    onClick={handleSubmit}>Əlavə et
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMaterial