import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SellerPropertyForm from './SellerPropertyForm'
import SellerPropertyList from './SellerPropertyList'

function SellerProperty() {
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state) => state.login);

    const [propertyData, setpropertyData] = useState([]);

    const [newProperty, setnewProperty] = useState(false);
    const togglepropertyForm = () => {
        setnewProperty(!newProperty);
    };

    const updateData = () => {

        setpropertyData([])
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}property/${user.seller_id}`);
                setpropertyData(response.data.data);
            } catch (error) { alert(error) }
        };
        setTimeout(() => {
            fetchData();
        }, 1000);

        if (newProperty === true) { setnewProperty(false) }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            alert('Login as Seller')
            navigate('/loginseller')
        }
        else {
            if (user.seller_id !== undefined) {
                updateData()
            }
        }
    }, []);

    return (

        <div className="sellerProducts_Wrapper">
            <div className="sellerProduct_Header">
                <h1>
                    {
                        newProperty ?
                            <span>New Property Form</span>
                            :
                            <span>My Properties</span>
                    }
                </h1>
                <button onClick={togglepropertyForm}>
                    {
                        newProperty ?
                            <span>✖</span>
                            :
                            <span>Add New Property</span>
                    }
                </button>
            </div>
            {
                newProperty ?
                    <SellerPropertyForm updateData={updateData} />
                    :
                    propertyData.length === 0 ?
                        <div className='loaderContianer'><div className="loader"></div></div>
                        :
                        <SellerPropertyList propertyData={propertyData} updateData={updateData} />
            }
        </div>

    );


}

export default SellerProperty