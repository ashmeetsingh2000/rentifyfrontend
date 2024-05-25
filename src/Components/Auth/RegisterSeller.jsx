import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { regsiter } from '../../redux/auth/registerSlice';

function RegisterSeller() {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.regsiter);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        businessName: '',
        type: 'seller'
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});
        const formErrors = validateForm(formData);

        if (Object.keys(formErrors).length === 0) {
            dispatch(regsiter(formData))

            setFormData({
                fullName: '',
                email: '',
                password: '',
                phoneNumber: '',
                businessName: '',
                type: 'seller'
            });
            setErrors({});
        }

        else {
            setErrors(formErrors);
        }
    };

    const phoneNumberPattern = /^\d+$/;
    const validateForm = (data) => {
        let errors = {};
        if (!data.fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!data.password.trim()) {
            errors.password = 'Password is required';
        }
        if (!data.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone Number is required';
        } else if (data.phoneNumber.length !== 10) {
            errors.phoneNumber = 'Phone Number must be 10 digits';
        } else if (!phoneNumberPattern.test(data.phoneNumber)) {
            errors.phoneNumber = 'Invalid Phone Number';
        }

        if (!data.businessName.trim()) {
            errors.businessName = 'Business Name is required';
        }
        return errors;
    };

    return (
        <div className="loginContainer">
            <div className="loginBox">

                <h1>Register As Seller</h1>

                {loading
                    ?
                    <div className='loaderContianer'><div className="loader"></div></div>
                    :
                    <form onSubmit={handleSubmit}>

                        <div className="formGroup">
                            <label htmlFor="fullName">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                            {errors.fullName && <span className="error">{errors.fullName}</span>}
                        </div>

                        <div className="formGroup">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="formGroup">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="formGroup">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                        </div>

                        <div className="formGroup">
                            <label htmlFor="businessName">Business Name:</label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                            />
                            {errors.businessName && <span className="error">{errors.businessName}</span>}
                        </div>

                        <div className="loginBox_Button">
                            <button type="submit">Register</button>
                        </div>

                        <p>
                            <span>Already have an account?</span>
                            <NavLink className="registerlink" to="/loginseller">
                                Login As Seller
                            </NavLink>
                        </p>

                    </form>
                }

            </div>
        </div>
    );

}

export default RegisterSeller