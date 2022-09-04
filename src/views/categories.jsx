import MainLayout from "../components/mainLayout";
import {useEffect, useState} from "react";
import CategoryService from "../api/category";
import AddModal from "../components/modals/categoryModals/addModal";
import EditModal from "../components/modals/categoryModals/editModal";
import moment from "moment";
import {BsPlusLg} from "react-icons/bs";
import {BsFillArrowDownSquareFill} from "react-icons/bs"
import {BsFillArrowUpSquareFill} from "react-icons/bs"
import SubCategory from "../api/subCategory";
import {toast} from "react-toastify";
import EditSubCategoryModal from "../components/modals/categoryModals/editSubCategoryModal";

const Categories = () => {
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState({status: false})
    const [editSubCategoryModal, setEditSubCategoryModal] = useState({status: false})
    const [categories, setCategories] = useState([])
    const [updateFormValues, setUpdateFormValues] = useState({})
    const [parentId, setParentId] = useState(null)
    const [activeRow, setActiveRow] = useState(0)

    const fetchCategories = async () => {
        return await CategoryService.getAll()
    }

    const handleEdit = id => {
        setEditModal({status: true, id})
        const data = categories?.find(item => item?.id === id)
        setUpdateFormValues({
            id: data?.id, name: data?.name, file: data?.file, isActive: data?.isActive, imageUrl: data?.imageUrl
        })
    }
    const handleEditSubCategory = (subCategory, categoryId) => {
        setEditSubCategoryModal({
            status: true,
            subCategory,
            categoryId
        })

    }
    const handleDelete = async id => {
        const {data} = await SubCategory.delete(id)
        if (data?.success) {
            fetchCategories().then(({data}) => {
                setCategories(data?.data)
            })
            toast.dark('Uğurla silindi',{
                position:'bottom-left'
            })
            return
        }
        toast.error('Xəta baş verdi',{
            position:'bottom-left'
        })
    }
    useEffect(() => {
        fetchCategories().then(({data}) => {
            setCategories(data?.data)
        })
    }, [])
    return (<MainLayout>
        <div className="container-fluid mt-5">
            <AddModal addModal={addModal} setAddModal={setAddModal} parentId={parentId} setParentId={setParentId}
                      fetchCategories={fetchCategories} setCategories={setCategories}/>
            <EditModal editModal={editModal} updateFormValues={updateFormValues} setEditModal={setEditModal}
                       fetchCategories={fetchCategories} setCategories={setCategories}/>
            <EditSubCategoryModal editModal={editSubCategoryModal} setEditModal={setEditSubCategoryModal}
                                  fetchCategories={fetchCategories} setCategories={setCategories}/>
            <div className="column">
                <div className="col-12">
                    <button className="btn btn-success mb-5 font-weight-bold" onClick={() => setAddModal(true)}>Əlavə
                        et
                    </button>
                </div>
                <div className="col-12">
                    <table className="table table-md-responsive table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Ad</th>
                            <th scope="col">Şəkil</th>
                            <th scope="col">Tarix</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories?.map(item => (<>
                            <tr className="border-top-custom" style={{backgroundColor: "#d0e6da"}} key={item?.id}>
                                <td style={{
                                    verticalAlign: "middle", width: "200px", marginRight: "20px"
                                }}>{item?.name}</td>
                                <td style={{verticalAlign: "middle"}}>
                                    <img width={100} src={process.env.REACT_APP_MEDIA_URL + item?.imageUrl}
                                         alt={item?.name}/>
                                </td>
                                <td style={{verticalAlign: "middle"}}
                                    width={300}>{moment(item?.createDate).format('DD.MM.YYYY')}</td>
                                <td style={{verticalAlign: "middle"}}>
                                <span
                                    className={`badge p-2 badge-${item?.isActive ? 'success' : 'danger'}`}>{item?.isActive ? 'Açıq' : 'Bağlı'}</span>
                                </td>
                                <td style={{verticalAlign: "middle"}}>
                                    <button className="btn btn-primary"
                                            onClick={() => handleEdit(item?.id)}>Redaktə
                                    </button>
                                    <button className="btn btn-outline-success-2 ml-3 mr-3"
                                            onClick={() => {
                                                setAddModal(true)
                                                setParentId(item?.id)
                                            }}><BsPlusLg/>
                                    </button>
                                    {activeRow !== item?.id ? (
                                        <BsFillArrowDownSquareFill fill="#008374" cursor="pointer"
                                                                   className="custom-down" size={40}
                                                                   onClick={() => setActiveRow(prev => prev === item?.id ? 0 : item?.id)}/>) : (
                                        <BsFillArrowUpSquareFill fill="#008374" cursor="pointer"
                                                                 className="custom-down" size={40}
                                                                 onClick={() => setActiveRow(prev => prev === item?.id ? 0 : item?.id)}/>)}
                                </td>
                            </tr>
                            {activeRow === item?.id && (item?.subcategories?.map(subcategory => (
                                <tr key={subcategory?.id} style={{backgroundColor: "#fff"}}>
                                    <td style={{
                                        verticalAlign: "middle", width: "200px", marginRight: "20px"
                                    }}>{subcategory?.name}</td>
                                    <td style={{verticalAlign: "middle"}}>
                                        <img width={100}
                                             src={process.env.REACT_APP_MEDIA_URL + subcategory?.imageUrl}
                                             alt={subcategory?.name}/>
                                    </td>
                                    <td style={{verticalAlign: "middle"}}
                                        width={300}>{moment(subcategory?.createDate).format('DD.MM.YYYY')}</td>
                                    <td style={{verticalAlign: "middle"}}>
                                <span
                                    className={`badge p-2 badge-${subcategory?.isActive ? 'success' : 'danger'}`}>{subcategory?.isActive ? 'Açıq' : 'Bağlı'}</span>
                                    </td>
                                    <td style={{verticalAlign: "middle"}}>
                                        <button className="btn btn-primary mr-3 "
                                                onClick={() => handleEditSubCategory(subcategory, item?.id)}>Redaktə
                                        </button>
                                        <button className="btn btn-danger"
                                                onClick={() => handleDelete(subcategory?.id)}>Sil
                                        </button>
                                    </td>
                                </tr>)))}
                        </>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </MainLayout>)
}

export default Categories