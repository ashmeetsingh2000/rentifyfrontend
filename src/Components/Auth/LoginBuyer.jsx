import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/loginSlice';

import { useNavigate } from 'react-router-dom';

function LoginBuyer() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isAuthenticated, user, loading, error } = useSelector((state) => state.login);

    const [credentials, setCredentials] = useState({ email: '', password: '', type: 'buyer' });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated]);

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
            email: '', password: '', type: 'buyer'
        });

    };

    return (
        <div className="loginContainer">
            <div className="loginBox">

                <h1>Login As Buyer</h1>

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
                            <NavLink className="registerlink" to="/registerbuyer">
                                Register
                            </NavLink>
                        </p>

                    </form>
                }

            </div>
        </div>
    );
}

export default LoginBuyer