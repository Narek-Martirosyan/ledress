import './header.scss';
import logo from './img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { BsHandbag } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { GrClose } from 'react-icons/gr';
import { Registration } from '../../pages/Registration';
import { useState } from 'react';
import { Login } from '../../pages/Login';
import { getUser } from '../../api/user_API';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

export const Header = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const token = useSelector(state => state.user.token); //global store
    const navigate = useNavigate();
    const number = useSelector(state => state.number.data);
    const { pathname } = useLocation();

    useEffect(() => {
        getUser().then(res => setCurrentUser(res?.data?.user));
    }, [number]);

    const goToFavouritesProductHandler = async () => {
        await navigate("/cart");
        setTimeout(() => {
            window.location.href = "#favourite"
        }, 700);
    }

    const logoutHandler = () => {
        Swal.fire({
            title: 'Are you sure? :(',
            text: "You want to log out :(",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out :(',
            cancelButtonText: "No, I'm staying :)"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location.href = "/ledress";
            }
        });
    }

    const mobileMenuHandler = () => {
        if (mobileMenu) {
            setMobileMenu(!mobileMenu);
        } else {
            setMobileMenu(!mobileMenu);
        }
    }

    useEffect(() => {
        setMobileMenu(false);
    }, [pathname]);

    return (
        <header className="header-section">
            <div className="header-top">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-4 col-md-3 text-center text-lg-left">
                            {/* logo */}
                            <Link to="/ledress" className="site-logo">
                                <img width={180} src={logo} alt="logo" />
                            </Link>
                        </div>

                        <div className='mobile-menu col-md-1 col-sm-1'>
                            {mobileMenu ?
                                <GrClose className='burger-icon' onClick={() => mobileMenuHandler()} /> :
                                <HiMenu className='burger-icon' onClick={() => mobileMenuHandler()} />
                            }
                            <ul className={mobileMenu ? "mobile-main-menu active-menu" : "mobile-main-menu"}>
                                <li><Link to="/ledress">Home</Link></li>
                                <li><Link to="/products">Products</Link></li>
                                <li><Link to="/cart">Cart</Link></li>
                                <li className='not-allowed'><span className='disable'>Checkout</span></li>
                                <li className='not-allowed'><span className='disable'>Contact</span></li>
                                <li><Link to="/myaccount">My account</Link></li>
                            </ul>
                        </div>

                        <div className="col-xl-5 col-lg-6 col-md-9 col-sm-10 user-panel-parent">
                            <div className="user-panel">
                                {token ?
                                    <div className="up-item">
                                        <div
                                            style={{ display: "inline" }}
                                            onClick={() => navigate("/cart")}
                                        >
                                            <div className="shopping-card me-2">
                                                <BsHandbag style={{ fontSize: "20px", cursor: "pointer" }} />
                                                <span>{currentUser?.userCart?.length}</span>
                                            </div>
                                            <span className='shopping-cart' style={{ border: "none" }}></span>
                                        </div>

                                        <div style={{ display: "inline" }}>
                                            <div className="shopping-card ms-3 me-2">
                                                <FaHandHoldingHeart style={{ fontSize: "20px", cursor: "pointer" }} />
                                                <span>{currentUser?.favorites?.length}</span>
                                            </div>
                                            <span
                                                className='favourite-products'
                                                style={{ border: "none" }}
                                                onClick={() => goToFavouritesProductHandler()}
                                            ></span>
                                        </div>

                                        <div
                                            style={{ display: "inline" }}
                                            onClick={() => logoutHandler()}>
                                            <div className="shopping-card ms-3 me-2">
                                                <FiLogOut style={{ fontSize: "20px", cursor: "pointer" }} />
                                            </div>
                                            <span
                                                className='log-out'
                                                style={{ border: "none", fontWeight: "600" }}
                                            ></span>
                                        </div>
                                    </div> :

                                    <div className="up-item">
                                        <AiOutlineUser style={{ fontSize: "25px" }} />
                                        <span onClick={() => setShowLogin(true)}>Sign In</span> or
                                        <span onClick={() => setShowRegister(true)}>Create Account</span>
                                    </div>
                                }
                            </div>

                            {showRegister ? <Registration setShowRegister={setShowRegister} /> : null}
                            {showLogin ? <Login setShowLogin={setShowLogin} /> : null}

                        </div>
                    </div>
                </div>
            </div>

            <nav className="main-navbar">
                <div className="container">
                    {/* menu */}

                    <ul className="main-menu">
                        <li><Link to="/ledress">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li className='not-allowed'><span className='disable' >Men</span></li>
                        <li className='not-allowed'>
                            <span className='disable'>
                                Jewelry
                                <span className="new">New</span>
                            </span>
                        </li>
                        <li className='not-allowed'><span className='disable'>Shoes</span>

                            <ul className="sub-menu">
                                <li className='not-allowed'><span className='disable'>Sneakers</span></li>
                                <li className='not-allowed'><span className='disable'>Sandals</span></li>
                                <li className='not-allowed'><span className='disable'>Formal Shoes</span></li>
                                <li className='not-allowed'><span className='disable'>Boots</span></li>
                                <li className='not-allowed'><span className='disable'>Flip Flops</span></li>
                            </ul>
                        </li>

                        <li><span>Pages</span>
                            <ul className="sub-menu">
                                {token ? <li><Link to={"/myaccount"}>My account</Link></li> : null}
                                <li><Link to="/products">Products</Link></li>
                                {token ? <li><Link to="/cart">Cart</Link></li> : null}
                                <li className='not-allowed'><span className='disable'>Checkout</span></li>
                                <li className='not-allowed'><span className='disable'>Contact</span></li>
                            </ul>
                        </li>

                        <li className='not-allowed'><span className='disable'>Blog</span></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}