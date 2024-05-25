import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellerPropertyList({ propertyData, updateData }) {

    const navigate = useNavigate();

    const changeData = () => {
        updateData();
    };

    const handleDelte = async (id, tittle) => {
        let text = `Are you Sure, you want to remove \n${tittle} Property`;
        if (window.confirm(text) === true) {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}property/delete/${id}`);
            if (response.status === 204) {
                alert(`${tittle} Property Delete Successfully`)
                changeData()
            }
            else {
                alert(`Unable to delte ${tittle} property, Please try later!`)
                changeData()
            }
        } else { }
    }

    const handleEdit = (id) => {
        navigate(`/sellerproperty/${id}`);
    }

    const truncateString = (str) => {
        const words = str.split(' ');
        if (words.length <= 13) {
            return str;
        }
        const truncatedWords = words.slice(0, 13);
        return truncatedWords.join(' ') + '...';
    }

    return (
        <div className="card-container">

            {
                propertyData[0] === 'Zero Property Listed' ?
                    <p className='zeroSellerProperty'>Zero Property Listed</p>
                    :
                    propertyData.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="card-content">
                                <img src='https://i.postimg.cc/KzY4x1SV/building-Icon.png' alt='BuildingIcon' />
                                <h2>{item.product_title}</h2>
                                <p><strong>Location:</strong> {item.product_location}</p>
                                <p><strong>Price:</strong> ${item.product_price}/month</p>
                                <p><strong>Bedrooms:</strong> {item.product_bedrooms}</p>
                                <p><strong>Bathrooms:</strong> {item.product_bathrooms}</p>
                                <p><strong>Description:</strong> {truncateString(item.product_description)}</p>
                                <div className="card_buttons">
                                    <p><strong>Likes:</strong>  {item.product_likes}</p>
                                    <div>
                                        <button className="delteButton" onClick={() => { handleDelte(item._id, item.product_title) }}>Delete</button>
                                        <button onClick={() => { handleEdit(item._id) }}>Edit</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))

            }

        </div>
    );
}


export default SellerPropertyList