
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addproperty } from '../../redux/property/newpropertySlice';
function SellerPropertyForm({ updateData }) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.login);
    const { loading } = useSelector((state) => state.addproperty);

    const [propertyForm, setpropertyForm] = useState({
        title: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        description: '',
        sellerid: user.seller_id
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpropertyForm({
            ...propertyForm,
            [name]: value
        });
    };

    const handleFormReset = () => {
        setpropertyForm({
            title: '',
            location: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            description: '',
            sellerid: user.seller_id
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addproperty(propertyForm))

        setpropertyForm({
            title: '',
            location: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            description: '',
            sellerid: user.seller_id
        });

        updateData()
    };

    return (
        <div className="newProperty_Form">
            {loading
                ?
                <div className='loaderContianer'><div className="loader"></div></div>
                :
                <form onSubmit={handleSubmit}>

                    <div className="property_formGroup">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder='Ex: Beautiful Family House'
                            value={propertyForm.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="property_formGroup">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder='Ex: 123 Maple Street, Springfield'
                            value={propertyForm.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="property_formGroup">
                        <label htmlFor="price">Price {'(Per Month)'}:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder='Ex: 1,200'
                            value={propertyForm.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="property_formGroup">
                        <label htmlFor="bedrooms">Bedrooms:</label>
                        <input
                            type="number"
                            id="bedrooms"
                            name="bedrooms"
                            placeholder='Ex: 1 - 10'
                            value={propertyForm.bedrooms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="property_formGroup">
                        <label htmlFor="bathrooms">Bathrooms:</label>
                        <input
                            type="number"
                            id="bathrooms"
                            name="bathrooms"
                            placeholder='Ex: 1 - 10'
                            value={propertyForm.bathrooms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="property_formGroup">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder='Ex:A beautiful family house located in a quiet neighborhood with a spacious backyard and modern amenities.'
                            value={propertyForm.description}
                            onChange={handleInputChange}
                            rows="5"
                            required
                        />
                    </div>

                    <div className="property_Button">
                        <button onClick={handleFormReset}>Clear</button>
                        <button type="submit">Submit</button>
                    </div>

                </form>
            }
        </div>
    );
}


export default SellerPropertyForm