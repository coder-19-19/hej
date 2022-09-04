import {Formik} from "formik";
import Products from "../../../api/products";

const AddModal = ({
                      addModal,
                      setAddModal,
                      initialFormValues,
                      subCategories,
                      fetchProducts,
                      setProducts,
                      setFormValues,
                      formValues,
    companies
                  }) => {
    const resetAndCloseForm = () => {
        setFormValues(prev => ({
            ...prev,
            formValues
        }))
        setAddModal(false)
    }
    const userAddProduct = async (values, {resetForm}) => {
        const data = await Products.add(values)
        fetchProducts().then(res => {
            setProducts(res?.data?.data)
        })
        resetAndCloseForm()
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
                    initialValues={initialFormValues}
                    onSubmit={userAddProduct}
                >
                    {({values, errors, handleChange, handleSubmit}) => (
                        <div className="modal-content border-dark outline-dark w-75 p-2">
                            <div className="bg-transparent mb-0 modal-header"><h5
                                className="modal-title font-weight-bold mr-2">Məhsul {initialFormValues?.id ? 'redaktə' : 'əlavə'} et</h5>
                                <button type="button" className="btn btn-outline-danger font-weight-bold"
                                        onClick={resetAndCloseForm}>X
                                </button>
                            </div>
                            <div className="pb-3 pt-0 modal-body row">
                                <div className="col-12 col-md-6">
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="name">Məhsulun adı</label>
                                        <input className="form-control border-dark" type="text" name="name"
                                               id="name" value={values.name}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="article">Məhsul artikul</label>
                                        <input className="form-control border-dark" type="number" name="article"
                                               id="name" value={values.article}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.article}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="description">Məhsulun açıqlaması</label>
                                        <textarea id="description" name="description"
                                                  className="form-control border-dark" value={values.description}
                                                  onChange={handleChange}/>
                                        <span className="text-danger">{errors.description}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="subCategory">Məhsulun kateqoriyası</label>
                                        <select name="subCategory.id" value={values?.subCategory?.id} onChange={handleChange} id="subCategory"
                                                className="form-control border-dark">
                                            {subCategories?.map(item => (
                                                <option value={item?.id}>{item?.name}</option>
                                            ))}
                                        </select>
                                        <span className="text-danger">{errors.subCategory}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="company">Məhsulun şirkəti</label>
                                        <select name="company.id" value={values?.company?.id} onChange={handleChange} id="company"
                                                className="form-control border-dark">
                                            {companies?.map(item => (
                                                <option value={item?.id}>{item?.name}</option>
                                            ))}
                                        </select>
                                        <span className="text-danger">{errors.subCategory}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="sale">Endirim (%)</label>
                                        <input className="form-control border-dark" placeholder="%" type="number"
                                               name="sale"
                                               id="name" value={values.sale}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.sale}</span>
                                    </div>
                                </div>
                                <div className="col-12  col-md-6">
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="purchasePrice">Alış qiyməti</label>
                                        <input className="form-control border-dark" type="number" name="purchasePrice"
                                               id="name" value={values.purchasePrice}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.purchasePrice}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="sellingPrice">Satış qiyməti</label>
                                        <input className="form-control border-dark" type="number" name="sellingPrice"
                                               id="name" value={values.sellingPrice}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.sellingPrice}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="stockValue">Anbardakı sayı</label>
                                        <input className="form-control border-dark" type="number" name="stockValue"
                                               id="name" value={values.stockValue}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.stockvalue}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="weight">Məhsulun çəkisi (qr)</label>
                                        <input className="form-control border-dark" type="number" name="weight"
                                               id="name" value={values.weight}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.weight}</span>
                                    </div>
                                    <div className="mb-2">
                                        <label className="d-block" htmlFor="hallmarkValue">Məhsulun əyarı</label>
                                        <input className="form-control border-dark" type="number" name="hallmarkValue"
                                               id="name" value={values.hallmarkValue}
                                               onChange={handleChange}/>
                                        <span className="text-danger">{errors.hallmarkValue}</span>
                                    </div>
                                </div>
                                <div className="mb-2 ml-3"><span>Status:</span>
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
                                            onClick={resetAndCloseForm}>İmtina et
                                    </button>
                                    <button type="submit"
                                            className={`ms-50 btn btn-${initialFormValues?.id ? 'primary' : 'success'}`}
                                            onClick={handleSubmit}>{initialFormValues?.id ? 'Redaktə et' : 'Əlavə et'}
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