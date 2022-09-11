import {Link, NavLink,useNavigate} from "react-router-dom";
import {BiCategoryAlt, BiUser} from "react-icons/bi";
import {BsListUl} from "react-icons/bs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {AiFillSetting} from "react-icons/ai";
import {CgOrganisation} from "react-icons/cg";
import {GoSignOut} from "react-icons/go";
import {GiMaterialsScience} from "react-icons/gi";

const MainLayout = ({children}) => {
    const menus = [
        {
            path:'/',
            name:'Tənizmləmələr',
            icon:<AiFillSetting/>
        },
        {
            path:'/companies',
            name:'Şirkətlər',
            icon:<CgOrganisation/>
        },
        {
            path:'/users',
            name:'İstifadəçilər',
            icon:<BiUser/>
        },
        {
            path:'/categories',
            name:'Kateqoriyalar',
            icon:<BiCategoryAlt/>
        },
        {
            path:'/material',
            name:'Materiallar',
            icon:<GiMaterialsScience/>
        },
        {
            path:'/products',
            name:'Məhsullar',
            icon:<BsListUl/>
        },
        {
            path:'/orders',
            name:'Sifarişlər',
            icon:<BsListUl/>
        },
    ]
    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
    return (
        <>
            <div id="wrapper">
                <ul className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">

                    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3 border-bottom">HEJ ADMİN</div>
                    </Link>
                    {menus.map(item => (
                        <li className={`nav-item ${window.location.pathname == item.path && 'active'}`} key={item.path}>
                            <NavLink className="nav-link" to={item.path}>
                                {item.icon}
                                <span className="ml-1">{item.name}</span></NavLink>
                        </li>
                    ))}
                    <li className={`nav-item`}>
                        <a className="nav-link" href="#" onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}>
                            <GoSignOut/>
                            <span className="ml-1">Çıxış</span></a>
                    </li>
                </ul>
                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                        {children}
                    </div>
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>HE Jewellery &copy; {new Date().getFullYear()}</span>
                            </div>
                        </div>
                    </footer>
                </div>


            </div>
            <ToastContainer/>
        </>
)
}

export default MainLayout