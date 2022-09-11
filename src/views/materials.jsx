import MainLayout from "../components/mainLayout";
import {useEffect, useState} from "react";
import Products from "../api/products";
import moment from "moment";
import AddMaterial from "../components/modals/addMaterial";
import {AiFillDelete} from "react-icons/ai";
import {toast} from "react-toastify";

const Materials = () => {
    const [materials,setMaterials] = useState([])
    const [addModal,setAddModal] = useState(false)

    const fetchMaterials = async () => {
        const {data} = await Products.getMaterials()
        setMaterials(data?.data)
    }

    const handleDelete = async id => {
        try {
            await Products.deleteMaterial(id)
            fetchMaterials()
            toast.success('Uğurla silindi',{
                position:'bottom-left'
            })
        }catch (e) {
            toast.error('Xəta baş verdi',{
                position:'bottom-left'
            })
        }
    }

    useEffect(() => {
        fetchMaterials()
    },[])
    return (
        <MainLayout>
            <AddMaterial setAddModal={setAddModal} addModal={addModal} fetchMaterial={fetchMaterials}/>
            <div className="container-fluid mt-5">
                <div className="column">
                    <div className="col-12">
                        <button className="btn btn-success mb-5 font-weight-bold"
                                onClick={() => setAddModal(true)}>Əlavə et
                        </button>
                    </div>
                    <div className="col-12">
                        <table className="table table-md-responsive table-hover">
                            <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Tarix</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {materials?.map(item => (
                                <tr key={item?.id}>
                                    <td>{item?.name}</td>
                                    <td>{moment(item?.date).format('DD.MM.YYYY')}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item?.id)}>
                                            <AiFillDelete/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Materials