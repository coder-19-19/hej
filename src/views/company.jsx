import MainLayout from "../components/mainLayout";
import {useEffect, useState} from "react";
import CompanyService from "../api/company";
import moment from "moment";
import {AiFillEye} from "react-icons/ai";
import AddCompany from "../components/modals/addCompany";

const Company = () => {
    const [addModal, setAddModal] = useState(false)
    const [companies, setCompanies] = useState([])
    const [activeCompany, setActiveCompany] = useState({})

    const fetchCompany = async () => {
        const {data} = await CompanyService.getAll()
        setCompanies(data?.data)
    }

    useEffect(() => {
        fetchCompany()
    }, [])
    return (<MainLayout>
        <AddCompany addModal={addModal} setAddModal={setAddModal} fetchCompany={fetchCompany}
                    activeCompany={activeCompany} setActiveCompany={setActiveCompany}/>
        <div className="container-fluid mt-5">
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
                            <th scope="col">Tarix</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {companies?.map(item => (
                            <tr key={item?.id}>
                                <td>{item?.name}</td>
                                <td>{moment(item?.createDate).format('DD.MM.YYYY')}</td>
                                <td>
                                    <span
                                        className={`badge p-2 badge-${item?.isActive ? 'success' : 'danger'}`}>{item?.isActive ? 'Açıq' : 'Bağlı'}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {
                                        setAddModal(true)
                                        setActiveCompany(item)
                                    }}>
                                        <AiFillEye/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </MainLayout>)
}

export default Company