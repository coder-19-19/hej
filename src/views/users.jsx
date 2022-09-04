import MainLayout from "../components/mainLayout";
import UsersService from '../api/user'
import {useEffect, useState} from "react";
import moment from "moment";

const Users = () => {
    const [users,setUsers] = useState([])
    const [user,setUser] = useState({})
    const [roles,setRoles] = useState([])
    const [modal,setModal] = useState({status:false})
    const [formData,setFormData] = useState()
    const [selectedRoles,setSelectedRoles] = useState([])
    const fetchUsers = async () => {
        const {data} = await UsersService.getAll()
        setUsers(data?.data)
    }
    const fetchRoles = async () => {
        const {data} = await UsersService.getRoles()
        setRoles(data?.data)
    }

    const handleSelect = (check,id) => {
        if(check) {
            setSelectedRoles(prev => ([
                ...prev,
                {id}
            ]))
        }else {
            setSelectedRoles(prev => ([
                ...prev?.filter(item => item?.id !== id)
            ]))
        }
    }

    const submitRole = async () => {
        const formData = {
            user: {
                id:user?.id
            },
            roles:selectedRoles
        }

        const data = await UsersService.addRole(formData)
        setSelectedRoles([])
        setModal({status: false})
        setUser({})
    }

    const getUser = async id => {
        const {data} = await UsersService.getUser(id)
        setUser(data?.data)
        let role
        if(data?.data?.roles?.length > 0) {
            role = data?.data?.roles?.map(item => {
                if(item) {
                    return {id:item?.id}
                }
                return
            })
        } else {
            role = []
        }
        console.log(role)
        setSelectedRoles(role)
        setModal({
            status: true
        })
    }

    useEffect(() => {
        fetchUsers()
        fetchRoles()
    }, [])
    return (
        <MainLayout>
            <div className="container-fluid mt-5">
                <div className="column">
                    <div className="col-12">
                        <table className="table table-md-responsive table-hover">
                            <tr>
                                <th scope="col">Ad</th>
                                <th scope="col">Soyad</th>
                                <th scope="col">Qeydiyyat tarixi</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Nörmə</th>
                                <th></th>
                            </tr>
                            <tbody>
                            {users?.map(item => (
                                <tr className="border-top-custom" style={{backgroundColor: "#d0e6da"}} key={item?.id}>
                                    <td>{item?.firstName}</td>
                                    <td>{item?.lastName}</td>
                                    <td>{moment(item?.createDate).format('DD.MM.YYYY')}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.phone}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => getUser(item?.id)}>Düzəliş et</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`modal fade show ${modal?.status && 'd-block'}`} role="dialog" tabIndex="-1">
                    <div
                        className="modal-dialog modal-dialog-centered hiq_register_modal modal-lg modal-dialog-scrollable"
                        role="document">
                        <div className="modal-content border-dark outline-dark w-75 p-2">
                            <div className="bg-transparent mb-0 modal-header"><h5
                                className="modal-title font-weight-bold mr-2">Rol dəyiş</h5>
                                <button type="button" className="btn btn-outline-danger font-weight-bold"
                                        onClick={() => {
                                            setSelectedRoles([])
                                            setUser({})
                                            setModal({status: false})
                                        }}>X
                                </button>
                            </div>
                            <div className="px-2">
                                {roles?.map(item => (
                                    <div key={item?.id} className="d-flex w-50 justify-content-between pl-3">
                                        <span className="font-weight-bold">{item?.name}</span>
                                        <span>
                                        <input type="checkbox" onClick={e => handleSelect(e.target.checked,item?.id)} defaultChecked={user?.roles?.find(i => i?.id == item?.id)}/>
                                    </span>
                                    </div>
                                ))}
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-success" onClick={submitRole}>Dəyiş</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Users
