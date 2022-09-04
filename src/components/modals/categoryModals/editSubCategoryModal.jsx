import {Formik} from "formik";
import {addCategorySchema} from "../../../utils/validation";
import {useState} from "react";
import SubCategory from "../../../api/subCategory";
import subCategory from "../../../api/subCategory";

const EditSubCategoryModal = ({editModal,setEditModal,fetchCategories,setCategories}) => {
    const [addFile,setAddFile] = useState(null)
    const userEditCategory = async (values) => {
        const formData = new FormData()
        formData.append('category.id', editModal?.categoryId)
        formData.append('id', values.id)
        formData.append('name', values.name)
        formData.append('isActive', values.isActive)
        formData.append('file', addFile)
        const data = await SubCategory.update(formData)
        fetchCategories().then(({data}) => {
            setCategories(data?.data)
        })
        setAddFile(null)
        setEditModal({status: false})
    }
    return (
        <div className={`modal fade show ${editModal?.status && 'd-block'}`} role="dialog" tabIndex="-1">
            <div
                className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                role="document">
                <Formik
                    enableReinitialize={true}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={addCategorySchema}
                    initialValues={editModal?.subCategory}
                    onSubmit={userEditCategory}
                >
                    {({values, errors, handleChange, handleSubmit}) => (
                        <div className="modal-content border-dark outline-dark w-75 p-2">
                            <div className="bg-transparent mb-0 modal-header"><h5
                                className="modal-title font-weight-bold">Alt kateqoriya redaktə et</h5>
                                <button type="button" className="btn btn-outline-danger font-weight-bold"
                                        onClick={
                                            () => {
                                                setEditModal(false)
                                            }
                                        }>X
                                </button>
                            </div>
                            <div className="pb-3 pt-0 modal-body d-flex flex-column">
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="name">Alt kateqoriyanın adı</label>
                                    <input className="form-control border-dark w-100" type="text" name="name"
                                           id="name" value={values?.name}
                                           onChange={handleChange}/>
                                    <span className="text-danger">{errors.name}</span>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="imageUrl">Alt kateqoriyanın şəkli</label>
                                    <img height={100}
                                         src={addFile ? URL.createObjectURL(addFile) : process.env.REACT_APP_MEDIA_URL + values?.imageUrl}
                                         alt={values?.name}/>
                                    <label className="w-25 mt-2 d-block btn btn-outline-dark btn-sm"
                                           htmlFor="image">Yeni
                                        şəkil
                                        <input id="image" type="file" className="d-none" accept="image/*"
                                               value={values?.file}
                                               onChange={e => {
                                                   setAddFile(e.target.files[0])
                                               }}
                                        />
                                    </label>
                                </div>
                                <div className="mb-2"><span>Status:</span>
                                    <label className="switch">
                                        <input name="isActive" type="checkbox" value={values?.isActive}
                                               defaultChecked={values?.isActive} onChange={handleChange}
                                               className="success"/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex justify-content-end mb-1">
                                    <button type="submit" className="ms-50 btn btn-outline-secondary mr-2"
                                            onClick={() => {
                                                setEditModal(false)
                                            }}>İmtina et
                                    </button>
                                    <button type="submit" className="ms-50 btn btn-primary"
                                            onClick={handleSubmit}>Redaktə et
                                    </button>
                                </div>
                            </div>
                        </div>)}
                </Formik>
            </div>
        </div>

    )
}

export default EditSubCategoryModal
