import Products from "../../../api/products";
import {BiPlus} from "react-icons/bi";

const AddModal = ({
                      materials,
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
    const userAddProduct = async e => {
        e.preventDefault()
        if(initialFormValues?.id) {
            const data = await Products.update(initialFormValues)
        }else {
            const data = await Products.add(initialFormValues)
        }
        fetchProducts().then(res => {
            setProducts(res?.data?.data)
        })
        resetAndCloseForm()
    }

    const handleChange = (e, name, index) => {
        const newProductDetails = [...initialFormValues.productDetails]
        if(name?.includes('.')) {
            const splitedName = name.split('.')
            newProductDetails[index][splitedName[0]][splitedName[1]] = e.target.value
        }
        else {
            newProductDetails[index][name] = e.target.value
        }
        setFormValues(prev => ({
            ...prev,
            productDetails: newProductDetails
        }))
    }
    const addProductDetail = (e) => {
        e.preventDefault()
        setFormValues(prev => ({
            ...prev,
            productDetails: [
                ...prev.productDetails,
                {
                    "hallmarkValue": 0,
                    "purchasePrice": 0,
                    "sellingPrice": 0,
                    "stockValue": 0,
                    "weight": 0,
                    "sale": 0,
                    "material": {
                        "id": ""
                    },
                    "size": 0
                }
            ]
        }))
    }

    return (
        <div className={`modal fade show ${addModal && 'd-block'}`} role="dialog" tabIndex="-1">
            <div
                className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                role="document">
                <form style={{minWidth: '776px'}} onSubmit={userAddProduct}
                      className="modal-content border-dark outline-dark w-75 p-2">
                    <div className="bg-transparent mb-0 modal-header"><h5
                        className="modal-title font-weight-bold mr-2">M??hsul {initialFormValues?.productDetails?.some(item => item?.id) ? 'redakt??' : '??lav??'} et</h5>
                        <button type="button" className="btn btn-outline-danger font-weight-bold"
                                onClick={resetAndCloseForm}>X
                        </button>
                    </div>
                    <div className="pb-3 pt-0 modal-body row">
                        <div className="col-12">
                            <div className="mb-2">
                                <label className="d-block" htmlFor="name">M??hsulun ad??</label>
                                <input className="form-control border-dark" type="text" name="name"
                                       id="name" value={initialFormValues.name}
                                       onChange={e => setFormValues(prev => ({
                                           ...prev,
                                           name: e.target.value
                                       }))}/>
                            </div>
                            <div className="mb-2">
                                <label className="d-block" htmlFor="article">M??hsul artikul</label>
                                <input className="form-control border-dark" type="number" name="article"
                                       id="article" value={initialFormValues.article}
                                       onChange={e => setFormValues(prev => ({
                                           ...prev,
                                           article: e.target.value
                                       }))}/>
                            </div>
                            <div className="mb-2">
                                <label className="d-block" htmlFor="description">M??hsulun a????qlamas??</label>
                                <textarea id="description" name="description"
                                          className="form-control border-dark" value={initialFormValues.description}
                                          onChange={e => setFormValues(prev => ({
                                              ...prev,
                                              description: e.target.value
                                          }))}/>
                            </div>
                            <div className="mb-2">
                                <label className="d-block" htmlFor="subCategory">M??hsulun kateqoriyas??</label>
                                <select name="subCategory.id" value={initialFormValues?.subCategory?.id}
                                        onChange={e => setFormValues(prev => ({
                                            ...prev,
                                            subCategory: {id: e.target.value}
                                        }))} id="subCategory"
                                        className="form-control border-dark">
                                    {subCategories?.map(item => (
                                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="d-block" htmlFor="company">M??hsulun ??irk??ti</label>
                                <select name="company.id" value={initialFormValues?.company?.id} id="company"
                                        className="form-control border-dark" onChange={e => setFormValues(prev => ({
                                    ...prev,
                                    company: {id: e.target.value}
                                }))}>
                                    {companies?.map(item => (
                                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2"><span>Status:</span>
                                <label className="switch">
                                    <input name="isActive" type="checkbox" checked={initialFormValues.isActive} value={initialFormValues.isActive}
                                           onChange={e => setFormValues(prev => ({
                                               ...prev,
                                               isActive: e.target.checked
                                           }))}
                                           className="success"/>
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="mb-4">
                                <button className="btn btn-success" onClick={addProductDetail}><BiPlus/></button>
                            </div>
                        </div>
                        {initialFormValues?.productDetails.map((item, index) => (
                            <div className="col-12 col-md-6 p-2" key={index} style={{border:'1px solid #b4a5a5'}}>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="company">M??hsulun material??</label>
                                    <select name="material.id" value={item?.material?.id} id="company"
                                            className="form-control border-dark"
                                            onChange={e => handleChange(e, 'material.id', index)}>
                                        {materials?.map(item => (
                                            <option key={item?.id} value={item?.id}>{item?.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="sale">Endirim (%)</label>
                                    <input className="form-control border-dark" placeholder="%" type="number"
                                           name="sale"
                                           id="name" value={item.sale}
                                           onChange={e => handleChange(e, 'sale', index)}/>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="purchasePrice">Al???? qiym??ti</label>
                                    <input className="form-control border-dark" type="number" name="purchasePrice"
                                           id="name" value={item.purchasePrice}
                                           onChange={e => handleChange(e, 'purchasePrice', index)}/>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="sellingPrice">Sat???? qiym??ti</label>
                                    <input className="form-control border-dark" type="number" name="sellingPrice"
                                           id="name" value={item.sellingPrice}
                                           onChange={e => handleChange(e, 'sellingPrice', index)}/>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="stockValue">Anbardak?? say??</label>
                                    <input className="form-control border-dark" type="number" name="stockValue"
                                           id="name" value={item.stockValue}
                                           onChange={e => handleChange(e, 'stockValue', index)}/>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="weight">M??hsulun ????kisi (qr)</label>
                                    <input className="form-control border-dark" type="number" name="weight"
                                           id="name" value={item.weight}
                                           onChange={e => handleChange(e, 'weight', index)}/>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="hallmarkValue">M??hsulun ??yar??</label>
                                    <input className="form-control border-dark" type="number" name="hallmarkValue"
                                           id="name" value={item.hallmarkValue}
                                           onChange={e => handleChange(e, 'hallmarkValue', index)}/>
                                </div>
                                <div className="mb-2">
                                    <label className="d-block" htmlFor="hallmarkValue">??l????</label>
                                    <input className="form-control border-dark" type="number" name="size"
                                           id="size" value={item.size}
                                           onChange={e => handleChange(e, 'size', index)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex justify-content-end mb-1">
                            <button type="submit" className="ms-50 btn btn-outline-secondary mr-2"
                                    onClick={resetAndCloseForm}>??mtina et
                            </button>
                            <button type="submit"
                                    className={`ms-50 btn btn-${initialFormValues?.id ? 'primary' : 'success'}`}
                            >{initialFormValues?.id ? 'Redakt?? et' : '??lav?? et'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddModal