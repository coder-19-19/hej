import MainLayout from "../components/mainLayout";
import moment from "moment";
import {AiFillDelete, AiOutlineCheck, AiOutlineEye} from "react-icons/ai";
import {BsImage} from "react-icons/bs";
import {useEffect, useState} from "react";
import Orders from "../api/orders";
import {toast} from "react-toastify";
import {CgClose} from "react-icons/cg";

const Order = () => {
    const [orders,setOrders] = useState([])
    const [modal,setModal] = useState({status:false})
    const fetchOrders = async () => {
        const {data} = await Orders.getAll()
        setOrders(data?.data)
    }

    const handleClick = async id => {
        try {
            await Orders.updateStatus(id)
            fetchOrders()
        }catch (e){
            toast.error('Xəta baş verdi',{
                position:'bottom-left'
            })
        }
    }

    useEffect(() => {
        fetchOrders()
    },[])
    return (
        <MainLayout>
            <div className="container-fluid mt-5">
                <div className="column">
                    <div className="col-12">
                        <table className="table table-md-responsive table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Ad</th>
                                <th scope="col">Soyad</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tarix</th>
                                <th scope="col">Qeyd</th>
                                <th scope="col">Telefon</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders?.map(item => (
                                <tr className="border-top-custom" style={{backgroundColor: "#d0e6da"}}
                                    key={item?.id}>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.firstName}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.lastName}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.email}</td>
                                    <td style={{verticalAlign: "middle"}}>{moment(item?.createDate).format('DD.MM.YYYY')}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.note}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.phone}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.address}</td>
                                    <td style={{
                                        verticalAlign: "middle"
                                    }}>{item?.isActive ? 'Çatdırılmayıb' : 'Çatdırılıb'}</td>
                                    <td>
                                        <button className={`btn btn-${item?.isActive ? 'success' : 'danger'}`} onClick={() => handleClick(item?.id)}>
                                            {item?.isActive ? (<AiOutlineCheck/>) : <CgClose/>}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => {
                                            setModal({
                                                status: true,
                                                item
                                            })
                                        }}>
                                            <AiOutlineEye/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={`modal fade show ${modal?.status && 'd-block'}`} role="dialog" tabIndex="-1">
                <div
                    className="modal-dialog modal-dialog-centered hiq__register__modal modal-lg modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content border-dark outline-dark w-75 p-2">
                        <div className="bg-transparent mb-0 modal-header"><h5
                            className="modal-title font-weight-bold mr-2">Ətraflı</h5>
                            <button type="button" className="btn btn-outline-danger font-weight-bold"
                                    onClick={() => setModal({status: false})}>X
                            </button>
                        </div>
                        <div className="pb-3 pt-0 pl-4 modal-body">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Ad</span>
                                        <span>{modal?.item?.firstName}</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Soyad</span>
                                        <span>{modal?.item?.lastName}</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Tarix</span>
                                        <span>{moment(modal?.item?.createDate).format('DD.MM.YYYY')}</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">E-mail</span>
                                        <span>{modal?.item?.email}</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Nömrə</span>
                                        <span>{modal?.item?.phone}</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Ünvan</span>
                                        <span>{modal?.item?.address}</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Qeyd</span>
                                        <span>{modal?.item?.note}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Status</span>
                                        <span>{modal?.item?.isActive ? 'Çatdırılmayıb' : 'Çatdırılıb'}</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Çatdırılma</span>
                                        <span>{modal?.item?.deliveryCost} AZN</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Endirim</span>
                                        <span>{modal?.item?.totalPrice - modal?.item?.totalLastPrice} AZN</span>
                                    </div>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span className="font-weight-bold">Ümumi dəyər</span>
                                        <span>{modal?.item?.totalLastPriceWithDelivery} AZN</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <table className="table mt-3">
                                        <thead>
                                        <tr style={{color:'#ff675d',textAlign:'left'}}>
                                            <th>Şəkil</th>
                                            <th>Ad</th>
                                            <th>Say</th>
                                            <th>Endirim</th>
                                            <th>Yekun qiymət</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {modal?.item?.orderItems?.map(item => (
                                            <tr key={item?.id} style={{margin:'6px 0',cursor:'pointer'}} onClick={() => window.open(process.env.REACT_APP_SITE_URL + `product/${item?.productDetail?.product?.id}?productDetailId=${item?.productDetail?.id}`)}>
                                                <td style={{verticalAlign:'middle'}}>
                                                    <img height={70} width={50} style={{objectFit:'cover'}} src={process.env.REACT_APP_MEDIA_URL + item?.productDetail?.product?.productImages[0]?.path} alt=""/>
                                                </td>
                                                <td style={{verticalAlign:'middle'}}>
                                                {item?.productDetail?.product?.name}
                                                </td>
                                                <td style={{verticalAlign:'middle'}}>
                                                <span>{item?.count}</span>
                                                </td>
                                                <td style={{verticalAlign:'middle'}}>
                                                <span>{item?.price} AZN</span>
                                                </td>
                                                <td style={{verticalAlign:'middle'}}>
                                                <span>{item?.lastPrice} AZN</span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Order