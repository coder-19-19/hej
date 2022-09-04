import {Formik} from "formik";
import {addCategorySchema} from "../../../utils/validation";
import {FcAddImage} from "react-icons/fc";
import CategoryService from "../../../api/category";
import {useState} from "react";
import SubCategoryService from "../../../api/subCategory";

const AddModal = ({addModal,setAddModal,fetchCategories,setCategories,parentId = null,setParentId}) => {
    const [addFile,setAddFile] = useState(null)
    const [loadedPercent,setLoadedPercent] = useState(0)
    const initialFormValues = {
        "name": '', "file": '', "isActive": true,
    }
    const userAddCategory = async (values, {resetForm}) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('isActive', values.isActive)
        formData.append('file', addFile)
        if(parentId) {
            formData.append('category.id', parentId )
            const data = await SubCategoryService.add(formData,setLoadedPercent)
        }else {
            const data = await CategoryService.add(formData)
        }
        resetForm()
        setAddFile(null)
        setParentId(null)
        setAddModal(false)
        setLoadedPercent(0)
        fetchCategories().then(({data}) => {
            setCategories(data?.data)
        })
    }
    return (
        <div className={`modal fade show ${addModal && 'd-block'}`} role="dialog" tabIndex="-1">
            <div
                className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                role="document">
                <Formik
                    enableReinitialize={true}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={addCategorySchema}
                    initialValues={initialFormValues}
                    onSubmit={userAddCategory}
                >
                    {({values, errors, handleChange, handleSubmit}) => (
                        <div className="modal-content border-dark outline-dark w-50 p-2">
                            <div className="bg-transparent mb-0 modal-header"><h5
                                className="modal-title font-weight-bold mr-2">{parentId && 'Alt '}Kateqoriya əlavə et</h5>
                                <button type="button" className="btn btn-outline-danger font-weight-bold"
                                        onClick={() => setAddModal(false)}>X
                                </button>
                            </div>
                            <div className="pb-3 pt-0 modal-body d-flex flex-column">
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="name">{parentId && 'Alt '}Kateqoriyanın adı</label>
                                    <input className="form-control border-dark" type="text" name="name"
                                           id="name" value={values.name}
                                           onChange={handleChange}/>
                                    <span className="text-danger">{errors.name}</span>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="imageUrl">{parentId && 'Alt '}Kateqoriyanın şəkli</label>
                                    <label style={{cursor: "pointer"}}>
                                        {addFile ? (
                                            <img height={100} src={URL.createObjectURL(addFile)} alt=""/>
                                        ) : (
                                            <FcAddImage style={{width: "50px", height: "50px"}}/>
                                        )}
                                        <input className="form-control-file border-dark d-none" type="file"
                                               name="imageUrl"
                                               id="imageUrl" value={values.imageUrl}
                                               accept="image/*"
                                               onChange={e => setAddFile(e.target.files[0])}/>
                                        {loadedPercent > 0 && loadedPercent} {loadedPercent > 0 && '%'}
                                    </label>
                                </div>
                                <div className="mb-2"><span>Status:</span>
                                    <label className="switch">
                                        <input name="isActive" type="checkbox" value={values.isActive}
                                               defaultChecked={values.isActive} onChange={handleChange}
                                               className="success"/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex justify-content-end mb-1">
                                    <button type="submit" className="ms-50 btn btn-outline-secondary mr-2"
                                            onClick={() => setAddModal(false)}>İmtina et
                                    </button>
                                    <button type="submit" className="ms-50 btn btn-success"
                                            onClick={handleSubmit}>Əlavə et
                                    </button>
                                </div>
                            </div>
                        </div>)}
                </Formik>
            </div>
        </div>

    )
}

export default AddModal