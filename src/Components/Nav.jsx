import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/auth/loginSlice';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.login);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/')
    };

    return (
        <>
            <nav className="navbarWrapper">
                <div className="navbar">
                    <div className="navbar-brand">
                        <NavLink className="navbarLinks" to="/">
                            Rentify
                        </NavLink>
                    </div>
                    <div className="navbar-buttons">
                        {
                            isAuthenticated
                                ?
                                <p>
                                    {
                                        user.buyer_fullname === undefined
                                            ?
                                            <NavLink title='Seller Panel' className='openSeller_Panel' to="/sellerproperty">Hello {user.seller_fullname} {`(${Object.keys(user)[1].split('_')[0]})`}</NavLink>
                                            :
                                            <>Hello {user.buyer_fullname} {`(${Object.keys(user)[1].split('_')[0]})`}</>
                                    }
                                    <button className='logOut_Btn' onClick={handleLogout}>Logout</button>

                                </p>
                                :
                                <>
                                    <NavLink className="navbarLinks btn" to="/loginseller">
                                        Login as a Seller
                                    </NavLink>
                                    <NavLink className="navbarLinks btn" to="/loginbuyer">
                                        Login as a Buyer
                                    </NavLink>
                                </>
                        }
                    </div>
                    <div className="hamburger" id="hamburger" onClick={toggleSidebar}>
                        ☰
                    </div>
                </div>
            </nav>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">

                <div className="close-icon" onClick={toggleSidebar}>✖</div>
                {
                    isAuthenticated
                        ?
                        <p>
                            {
                                user.buyer_fullname === undefined
                                    ?
                                    <NavLink to="/sellerproperty">Hello {user.seller_fullname} {`(${Object.keys(user)[1].split('_')[0]})`}</NavLink>
                                    :
                                    <>Hello {user.buyer_fullname} {`(${Object.keys(user)[1].split('_')[0]})`}</>
                            }
                            <button className='logOut_Btn' onClick={handleLogout}>Logout</button>

                        </p>
                        :
                        <>
                            <NavLink className="navbarLinks btn" to="/loginseller">
                                Login as a Seller
                            </NavLink>
                            <NavLink className="navbarLinks btn" to="/loginbuyer">
                                Login as a Buyer
                            </NavLink>
                        </>
                }

            </div>
        </>
    );
}

export default Nav