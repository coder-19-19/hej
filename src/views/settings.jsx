import MainLayout from "../components/mainLayout";
import {useEffect, useState} from "react";
import AddBanner from "../components/modals/addBanner";
import Constants from "../api/constants";
import moment from "moment";
import {AiFillDelete} from "react-icons/ai";
import ConstantsService from "../api/constants";
import {toast} from "react-toastify";

const Settings = () => {
    const [addModal, setAddModal] = useState(false)
    const [type, setType] = useState('MAIN')
    const [banners, setBanners] = useState([])
    const [tab, setTab] = useState(1)
    const [constants, setConstants] = useState([])
    const [updatedConstants,setUpdatedConstants] = useState([])

    const fetchBanners = async () => {
        const {data} = await Constants.getBanners()
        setBanners(data?.data)
    }

    const fetchConstants = async () => {
        const {data} = await ConstantsService.getConstants()
        setConstants(data?.data)
    }

    const deleteBanner = async id => {
        try {
            await ConstantsService.deleteBanner(id)
            toast.success('Uğurla silindi', {
                position: 'bottom-left'
            })
            await fetchBanners()
        } catch (e) {
            toast.error('Xəta baş verdi', {
                position: 'bottom-left'
            })
        }
    }

    const handleUpdate = async id => {
        try {
            await ConstantsService.updateBanner(id)
            toast.success('Uğurla dəyişildi', {
                position: 'bottom-left'
            })
            await fetchBanners()
        } catch (e) {
            toast.error('Xəta baş verdi', {
                position: 'bottom-left'
            })
        }
    }

    const handleSubmit = async () => {
        try {
            await ConstantsService.updateConstants(updatedConstants)
            toast.success('Uğurla dəyişildi', {
                position: 'bottom-left'
            })
        } catch (e) {
            toast.error('Xəta baş verdi', {
                position: 'bottom-left'
            })
        }
    }

    const handleConstantChange = (e,title) => {
        const has = updatedConstants?.some(item => item.title === title)
        if(has){
            const data = [...updatedConstants]
            const index = updatedConstants?.findIndex(item => item?.title === title)
            data[index].value = e.target.value
            setUpdatedConstants(data)
            return
        }
        setUpdatedConstants(prev => ([
            ...prev,
            {
                title,
                value:e.target.value
            }
        ]))
    }

    useEffect(() => {
        fetchBanners()
        fetchConstants()
    }, [])

    return (
        <MainLayout>
            <AddBanner addModal={addModal} setAddModal={setAddModal} type={type} fetchBanners={fetchBanners}/>
            <div className="container-fluid mt-5">
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <a className={`nav-link ${tab === 1 && 'active'}`} aria-current="page" onClick={() => setTab(1)}
                           href="#">Ümumi</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${tab === 2 && 'active'}`} href="#"
                           onClick={() => setTab(2)}>Banner-lər</a>
                    </li>
                </ul>
                {tab === 2 ? (
                    <div className="column">
                        <div className="col-12">
                            <button className="btn btn-success mb-5 font-weight-bold" onClick={() => {
                                setType('MAIN')
                                setAddModal(true)
                            }}>
                                Banner əlavə et
                            </button>
                            <button className="btn btn-success mb-5 font-weight-bold ml-2" onClick={() => {
                                setType('SALE')
                                setAddModal(true)
                            }}>
                                Endirim əlavə et
                            </button>
                        </div>
                        <div className="col-12">
                            <table className="table table-md-responsive table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Şəkil</th>
                                    <th scope="col">Qeyd</th>
                                    <th scope="col">Tarix</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Tip</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {banners?.map(item => (
                                    <tr key={item?.id}>
                                        <td style={{verticalAlign: "middle"}}>
                                            <img style={{objectFit: 'cover'}} width={100} height={100}
                                                 src={process.env.REACT_APP_MEDIA_URL + item?.path}
                                                 alt={item?.note}/>
                                        </td>
                                        <td style={{
                                            verticalAlign: "middle", width: "200px", marginRight: "20px"
                                        }}>{item?.note}</td>
                                        <td style={{verticalAlign: "middle"}}>
                                            {moment(item?.createDate).format('DD.MM.YYYY')}
                                        </td>
                                        <td style={{verticalAlign: "middle"}}>
                                <span
                                    className={`badge p-2 badge-${item?.isActive ? 'success' : 'danger'}`}>{item?.isActive ? 'Açıq' : 'Bağlı'}</span>
                                        </td>

                                        <td style={{verticalAlign: "middle"}}>{item?.bannerType === 'MAIN' ? 'Banner' : 'Endirim'}</td>
                                        <td style={{verticalAlign: "middle"}}>
                                            <button className="btn btn-danger"
                                                    onClick={() => {
                                                        deleteBanner(item?.id)
                                                    }}><AiFillDelete/>
                                            </button>
                                            <label className="switch">
                                                <input name="isActive" type="checkbox" value={item?.isActive}
                                                       checked={item?.isActive}
                                                       onChange={() => handleUpdate(item?.id)}
                                                       className="success"/>
                                                <span className="slider round"></span>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : <div className="column">
                    {constants?.map(item => (
                        <div className="col-12 col-md-6">
                            <div className="mb-2">
                                <label htmlFor={item?.title}>{item?.title}</label>
                                <input onChange={e => handleConstantChange(e,item?.title)} className="form-control border-dark" placeholder={item?.title} name={item?.title}
                                       id={item?.title} defaultValue={item.value}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="col-12 col-md-6 mb-3">
                        <div className="d-flex justify-content-end">
                            <button onClick={handleSubmit} className="btn btn-success">Yadda saxla</button>
                        </div>
                    </div>
                </div>}
            </div>
        </MainLayout>
    )
}

export default Settings