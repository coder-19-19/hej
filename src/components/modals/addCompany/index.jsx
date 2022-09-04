import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Company from "../../../api/company";

const AddCompany = ({addModal,setAddModal,fetchCompany,activeCompany,setActiveCompany}) => {
    const initialValues = {
        name:null,
        isActive:null
    }
    const [formData,setFormData] = useState(initialValues)

    const resetAndCloseForm = () => {
        setActiveCompany({})
        setFormData(initialValues)
        setAddModal(false)
    }

    const handleSubmit = async () => {
        try {
            if(formData?.id) {
                await Company.update(formData)
            }else {
                await Company.add(formData)
            }
            toast.success(`Uğurla ${formData?.id ? 'Təsdiq' : 'Əlavə'} edildi`,{
                position:'bottom-left'
            })
            await fetchCompany()
            resetAndCloseForm()
        }catch (e) {
            toast.error('Xəta baş verdi',{
                position:'bottom-left'
            })
        }
    }

    useEffect(() => {
        if(activeCompany?.name) {
            setFormData(activeCompany)
        }
    },[activeCompany])
    return (
        <div className={`modal fade show ${addModal && 'd-block'}`} role="dialog" tabIndex="-1">
            <div
                className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                role="document">
                <div className="modal-content border-dark outline-dark w-50 p-2">
                    <div className="bg-transparent mb-0 modal-header"><h5
                        className="modal-title font-weight-bold mr-2">Şirkət əlavə et</h5>
                        <button type="button" className="btn btn-outline-danger font-weight-bold"
                                onClick={resetAndCloseForm}>X
                        </button>
                    </div>
                    <div className="pb-3 pt-0 modal-body d-flex flex-column">
                        <div className="mb-2">
                            <label className="d-block" htmlFor="name">Şirkətin adı</label>
                            <input className="form-control border-dark" type="text" name="name"
                                   id="name" defaultValue={formData.name}
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
                                    onClick={handleSubmit}>{activeCompany?.id ? 'Təsdiq' :'Əlavə'} et
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCompany