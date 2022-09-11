import MainLayout from "../components/mainLayout";
import {useEffect, useState} from "react";
import AddModal from "../components/modals/productModals/AddModal";
import SubCategory from "../api/subCategory";
import Product from "../api/products";
import moment from "moment";
import {AiFillDelete, AiFillEye, AiOutlineEye} from "react-icons/ai";
import {BsImage} from "react-icons/bs";
import {toast} from "react-toastify";
import AddImageModal from "../components/modals/productModals/addImageModal";
import ProductImage from "../api/productImage";
import CustomPagination from "../components/pagination";
import Company from "../api/company";

const formValues = {
    "article": "",
    "description": "",
    "name": "",
    "subCategory": {
        "id": "",
    },
    "company": {
        "id": ""
    },
    "isActive": true,
    productDetails: [
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
}

const Products = () => {
    const [addModal, setAddModal] = useState(false)
    const [subCategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])
    const [initialFormValues, setInitialFormValues] = useState(formValues)
    const [addImageModal, setAddImageModal] = useState({status: false})
    const [images, setImages] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [companies, setCompanies] = useState([])
    const [materials, setMaterials] = useState([])
    const fetchSubCategories = async () => {
        return await SubCategory.getAll()
    }
    const fetchProducts = async (params = null) => {
        return await Product.getAll(params)
    }
    const fetchProductsImages = async () => {
        return await ProductImage.getAll()
    }
    const fetchMaterials = async () => {
        const {data} = await Product.getMaterials()
        setMaterials(data?.data)
    }

    const handleUpdate = item => {
        setInitialFormValues({
            "id":item?.id,
            "article": item?.article,
            "description": item?.description,
            "name": item?.name,
            "subCategory": {
                "id": item?.subCategory?.id,
            },
            "company": {
                "id": item?.company?.id
            },
            "isActive": item?.isActive,
            productDetails: item?.productDetails
        })
    }

    const deleteProduct = async id => {
        const {data} = await Product.delete(id)
        if (data?.success) {
            fetchProducts({number: page}).then(res => {
                setProducts(res?.data?.data)
            })
            toast.dark('Uğurla silindi', {
                position: 'bottom-left'
            })
            return
        }
        toast.error('Xəta baş verdi', {
            position: 'bottom-left'
        })
    }


    const fetchCompanies = async () => {
        const {data} = await Company.getAll()
        setCompanies(data?.data)
    }
    useEffect(() => {
        fetchCompanies()
        fetchMaterials()
        Promise.all([fetchSubCategories(), fetchProductsImages()]).then(res => {
            const [{data}, productImages] = res
            setSubCategories(data?.data)
            setImages(productImages?.data?.data)
        })
    }, [])
    useEffect(() => {
        fetchProducts({
            page: page - 1
        }).then(res => {
            setProducts(res?.data?.data)
            setTotal(res?.data?.data?.totalElements)
        })
    }, [page])
    return (
        <MainLayout>
            <AddModal materials={materials} companies={companies} initialFormValues={initialFormValues}
                      setAddModal={setAddModal} addModal={addModal}
                      subCategories={subCategories}
                      setProducts={setProducts} fetchProducts={fetchProducts} formValues={formValues}
                      setFormValues={setInitialFormValues}/>
            <AddImageModal addModal={addImageModal} setAddModal={setAddImageModal} fetchImages={fetchProductsImages}
                           setImages={setImages}/>
            <div className="container-fluid mt-5">
                <div className="column">
                    <div className="col-12">
                        <button className="btn btn-success mb-5 font-weight-bold"
                                onClick={() => {
                                    setInitialFormValues(formValues)
                                    setAddModal(true)
                                }}>Əlavə
                            et
                        </button>
                    </div>
                    <div className="col-12">
                        <table className="table table-md-responsive table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Ad</th>
                                <th scope="col">Şirkət</th>
                                <th scope="col">Artikul</th>
                                <th scope="col">Tarix</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {products?.content?.map(item => (
                                <tr className="border-top-custom" style={{backgroundColor: "#d0e6da"}}
                                    key={item?.id}>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.name}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.company?.name}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.article}</td>
                                    <td style={{verticalAlign: "middle"}}>{moment(item?.createDate).format('DD.MM.YYYY')}</td>
                                    <td style={{verticalAlign: "middle"}}>
                                <span
                                    className={`badge p-2 badge-${item?.isActive ? 'success' : 'danger'}`}>{item?.isActive ? 'Açıq' : 'Bağlı'}</span>
                                    </td>
                                    <td style={{verticalAlign: "middle"}}>
                                       <div className="d-flex align-items-center">
                                           <button className="btn btn-primary mr-3"
                                                   onClick={() => {
                                                       handleUpdate(item)
                                                       setAddModal(true)
                                                   }}><AiOutlineEye/>
                                           </button>
                                           <button className="btn btn-success mr-3"
                                                   onClick={() => {
                                                       setAddImageModal({
                                                           status: true,
                                                           id: item?.id,
                                                           productImages: images?.filter(image => image?.product?.id === item?.id)
                                                       })
                                                   }}><BsImage/>
                                           </button>
                                       </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <CustomPagination
                                justifyContent="end"
                                className="pagination-bar"
                                currentPage={page}
                                totalCount={total}
                                pageSize={10}
                                onPageChange={(page) => {
                                    setPage(page);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Products