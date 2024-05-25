import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/loginSlice';

import { useNavigate } from 'react-router-dom';

function LoginSeller() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.login);

    const [credentials, setCredentials] = useState({ email: '', password: '', type: 'seller' });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/sellerproperty')
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(login(credentials))

        setCredentials({
            email: '', password: '', type: 'seller'
        });

    };

    return (
        <div className="loginContainer">
            <div className="loginBox">

                <h1>Login As Seller</h1>
                {loading
                    ?
                    <div className='loaderContianer'><div className="loader"></div></div>
                    :
                    <form onSubmit={handleSubmit}>

                        <div className="formGroup">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="loginBox_Button">
                            <button type="submit">Login</button>
                        </div>

                        <p>
                            <span>Don't have an account?</span>
                            <NavLink className="registerlink" to="/registerseller">
                                Register
                            </NavLink>
                        </p>

                    </form>
                }
            </div>
        </div>
    );
}

export default LoginSeller