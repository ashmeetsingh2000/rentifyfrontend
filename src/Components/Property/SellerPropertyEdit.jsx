import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellerPropertyEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [propertyForm, setpropertyForm] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}property/detail/${id}`);
                setpropertyForm(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch details');
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpropertyForm({
            ...propertyForm,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}property/${id}`, propertyForm);
            alert('Property updated successfully');
            navigate('/sellerproperty')
        } catch (error) {
            setError('Please try updating detials later some issue occured!');
        }
    };

    if (error) return <div className='updatingError'>{error}</div>;

    return (
        <div className="propertyFormEdit">
            {loading
                ?
                <div className='loaderContianer'><div className="loader"></div></div>
                :
                <>
                    <h1>Edit Property Details</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="property_formGroup">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="product_title"
                                placeholder='Ex: Beautiful Family House'
                                value={propertyForm.product_title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="property_formGroup">
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="product_location"
                                placeholder='Ex: 123 Maple Street, Springfield'
                                value={propertyForm.product_location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="property_formGroup">
                            <label htmlFor="price">Price {'(Per Month)'}:</label>
                            <input
                                type="number"
                                id="price"
                                name="product_price"
                                placeholder='Ex: 1,200'
                                value={propertyForm.product_price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="property_formGroup">
                            <label htmlFor="bedrooms">Bedrooms:</label>
                            <input
                                type="number"
                                id="bedrooms"
                                name="product_bedrooms"
                                placeholder='Ex: 1 - 10'
                                value={propertyForm.product_bedrooms}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="property_formGroup">
                            <label htmlFor="bathrooms">Bathrooms:</label>
                            <input
                                type="number"
                                id="bathrooms"
                                name="product_bathrooms"
                                placeholder='Ex: 1 - 10'
                                value={propertyForm.product_bathrooms}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="property_formGroup">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="product_description"
                                placeholder='Ex: A beautiful family house located in a quiet neighborhood with a spacious backyard and modern amenities.'
                                value={propertyForm.product_description}
                                onChange={handleInputChange}
                                rows="5"
                                required
                            />
                        </div>

                        <div className="property_Button">
                            <button type="submit">Update</button>
                        </div>

                    </form>
                </>
            }
        </div>
    )
}

export default SellerPropertyEdit