import {FcAddImage} from "react-icons/fc";
import { useState} from "react";
import {toast} from "react-toastify";
import ConstantsService from "../../../api/constants";

const AddBanner = ({addModal,setAddModal,type,fetchBanners}) => {
    const [files,setFiles] = useState({})
    const [isRequested,setIsRequested] = useState(false)
    const [status,setStatus] = useState(true)
    const [description,setDescription] = useState('')

    const resetAndCloseForm = () => {
        setAddModal(false)
        setFiles({})
        setStatus(true)
        setIsRequested(false)
        setDescription('')
    }

    const addFile = e => {
        setFiles({})
        const localFiles = e.target.files[0]
        setFiles(localFiles)
    }
    const handleDelete = () => {
        setFiles({})
    }

    const handleSubmit = async () => {
        setIsRequested(true)
        const formData = new FormData()
        formData.append('bannerType',type)
        formData.append('file',files)
        formData.append('isActive',status)
        formData.append('note',description)

        try {
            await ConstantsService.addBanner(formData)
            toast.success('Uğurla əlavə edildi',{
                position:'bottom-left'
            })
            await fetchBanners()
            resetAndCloseForm()
        }catch (e) {
            toast.error('Xəta baş verdi',{
                position:'bottom-left'
            })
        }

        setIsRequested(false)

    }
    return (
        <div className={`modal fade show ${addModal && 'd-block'}`} role="dialog" tabIndex="-1">
            <div
                className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                role="document">
                <div className="modal-content border-dark outline-dark w-50 p-2">
                    <div className="bg-transparent mb-0 modal-header"><h5
                        className="modal-title font-weight-bold mr-2">{type === 'MAIN' ? 'Banner' : 'Endirim'} əlavə et</h5>
                        <button type="button" className="btn btn-outline-danger font-weight-bold"
                                onClick={resetAndCloseForm}>X
                        </button>
                    </div>
                    <div className="pb-3 pt-0 modal-body d-flex flex-column">
                        <label style={{cursor: "pointer"}}>
                            <FcAddImage style={{width: "50px", height: "50px"}}/>
                            <input className="form-control-file border-dark d-none" type="file"
                                   name="imageUrl"
                                   id="imageUrl"
                                   accept="image/*"
                                   onChange={addFile}/>
                        </label>
                        {files?.name && (
                            <div className="d-flex flex-wrap">
                                <div className="d-flex flex-column">
                                    <img src={URL.createObjectURL(files)} height="100" className="mr-2 mt-2"/>
                                    <button className="btn mt-2 mr-2 btn-danger" onClick={handleDelete}>Sil</button>
                                </div>
                            </div>
                        )}
                        <div className="mb-2">
                            <label className="d-block" htmlFor="description">Qeyd</label>
                            <textarea id="description" name="description" className="form-control border-dark" value={description}
                                      onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className="mb-2"><span>Status:</span>
                            <label className="switch">
                                <input name="isActive" type="checkbox" value={status} checked={status}
                                       onChange={() => setStatus(!status)}
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
                            <button disabled={!files?.name || isRequested} type="submit" className="ms-50 btn btn-success"
                                    onClick={handleSubmit}>Təsdiqlə
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBanner