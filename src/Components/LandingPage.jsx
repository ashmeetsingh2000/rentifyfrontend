/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state) => state.login);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelloading, setmodelloading] = useState(true);
    const [enquireRes, setenquireRes] = useState({});

    const [loading, setloading] = useState(true);
    const [property, setproperty] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [likeUnlikeArr, setlikeUnlikeArr] = useState([]);

    const [filter, setFilter] = useState({
        title: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
    });

    useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}property/propertylist`, {
                    title: filter.title,
                    location: filter.location,
                    bedrooms: filter.bedrooms ? Number(filter.bedrooms) : '',
                    bathrooms: filter.bathrooms ? Number(filter.bathrooms) : '',
                    page: currentPage === 0 ? 1 : currentPage
                });
                setTotalPages(response.data.totalPages);
                setTimeout(() => {
                    if (response.status === 200) {
                        setloading(false)
                        setproperty(response.data.data);

                        if (user !== null) {
                            setlikeUnlikeArr(user.buyer_likedProperties)
                        }
                    }
                    else {
                        alert('Rentify server error, please try later!')
                    }
                }, 1000);
            } catch (error) {
                console.error('Error fetching Data:', error);
            }
        };

        fetchItems();

    }, [currentPage]);

    // ================== paggination buttons ==================
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setloading(true)
            setproperty([])
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage === 0 ? currentPage + 2 : currentPage + 1);
            setloading(true)
            setproperty([])
        }
    };
    // ================== paggination buttons ==================


    const truncateString = (str) => {
        const words = str.split(' ');
        if (words.length <= 13) {
            return str;
        }
        const truncatedWords = words.slice(0, 13);
        return truncatedWords.join(' ') + '...';
    }


    // ================== filter form handling ==================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (filter.title === '' &&
            filter.location === '' &&
            filter.bedrooms === '' &&
            filter.bathrooms === '') {
            alert('No filter Applied')
        }
        else {
            setloading(true)
            currentPage === 1 ? setCurrentPage(0) : setCurrentPage(1)
        }

    }

    const handleReset = () => {
        currentPage === 1 ? setCurrentPage(0) : setCurrentPage(1)
        setloading(true)
        setFilter({
            title: '',
            location: '',
            bedrooms: '',
            bathrooms: '',
        })
    }
    // ================== filter form handling ==================


    // ===================== Email inquire ======================
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const authenticationRequired = () => {
        alert('Login Required !');
        navigate('/loginbuyer')
    }

    const handleInquire = (sellerid, productid) => {
        setmodelloading(true)
        const emailer = async () => {
            alert(`Enquire Response have also been sent on registered email address (${user.buyer_email})`)
            openModal()

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}nodemailer/email`, {
                    sellerId: sellerid,
                    propertyID: productid,
                    buyerEmail: user.buyer_email
                });
                setenquireRes(response.data.data)
                setmodelloading(false)
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        emailer();

    }
    // ===================== Email inquire ======================


    // =================== Like Unlike Feature ==================
    const handle_LikeUnlike = async (action, buyerID, productid) => {

        if (action === 'like') {

            // add to local
            setlikeUnlikeArr(prevState => [...prevState, productid]);

            // add to database
            const response = await axios.post(`${process.env.REACT_APP_API_URL}buyeraction/like`, {
                buyer_ID: buyerID,
                property_ID: productid,
            });
            if (response.status === 200) {
                const updatedData = property.map(item =>
                    item._id === productid ? { ...item, ['product_likes']: response.data.updatedLikeCount } : item
                );
                setproperty(updatedData);
            }

        } else {

            // remove from local
            setlikeUnlikeArr(prevState => prevState.filter(item => item !== productid));

            // remove from database
            const response = await axios.post(`${process.env.REACT_APP_API_URL}buyeraction/dislike`, {
                buyer_ID: buyerID,
                property_ID: productid,
            });
            if (response.status === 200) {
                const updatedData = property.map(item =>
                    item._id === productid ? { ...item, ['product_likes']: response.data.updatedLikeCount } : item
                );
                setproperty(updatedData);
            }
        }

    }
    // =================== Like Unlike Feature ==================

    return (
        <div className='propertyListWrapper'>

            <div className="filtersSectionWrapper">
                <h1>Filter</h1>

                <form onSubmit={handleSubmit}>

                    <div className="filter_formGroup">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={filter.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="filter_formGroup">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={filter.location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="filter_formGroup">
                        <label htmlFor="bedrooms">Bedrooms:</label>
                        <input
                            type="number"
                            id="bedrooms"
                            name="bedrooms"
                            placeholder='Ex: 1 - 10'
                            value={filter.bedrooms}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="filter_formGroup">
                        <label htmlFor="bathrooms">Bathrooms:</label>
                        <input
                            type="number"
                            id="bathrooms"
                            name="bathrooms"
                            placeholder='Ex: 1 - 10'
                            value={filter.bathrooms}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="filter_formGroup_button">
                        <span onClick={handleReset} >Reset</span>
                        <button type='submit'>Search</button>
                    </div>

                </form>

            </div>

            <div className="propertListContainer">

                <div className="containerHeading">

                    <h1>Property List</h1>

                    <div className='pagginationButtons'>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span> Page {currentPage === 0 ? '1' : currentPage} of {totalPages} </span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>

                </div>

                <div className="home_card-container">

                    {
                        loading === true ?
                            <div className='loaderContianer'><div className="loader"></div></div>
                            :
                            property.length === 0 ?
                                <div className='nodataFound'>No Property data found!</div>
                                :
                                property.map((item) => {
                                    return (
                                        <div className="card" key={item._id}>
                                            <div className="card-content">
                                                <img src='https://i.postimg.cc/KzY4x1SV/building-Icon.png' alt='BuildingIcon' />
                                                <h2>{item.product_title}</h2>
                                                <p><strong>Location:</strong> {item.product_location}</p>
                                                <p><strong>Price:</strong> ${item.product_price}/month</p>
                                                <p><strong>Bedrooms:</strong> {item.product_bedrooms}</p>
                                                <p><strong>Bathrooms:</strong> {item.product_bathrooms}</p>
                                                <p><strong>Description:</strong> {truncateString(item.product_description)}</p>
                                                <p><strong>Likes:</strong> {item.product_likes}</p>
                                                {
                                                    isAuthenticated ?
                                                        user.buyer_fullname === undefined
                                                            ?
                                                            <></>
                                                            :
                                                            <div className='card_buttons'>
                                                                {
                                                                    likeUnlikeArr.includes(item._id)
                                                                        ?
                                                                        <button className='likeUnlike_Button' onClick={() => { handle_LikeUnlike('unlike', user._id, item._id) }}>Dislike</button>
                                                                        :
                                                                        <button className='likeUnlike_Button' onClick={() => { handle_LikeUnlike('like', user._id, item._id) }}>Like</button>
                                                                }
                                                                <button className='inquireButton' onClick={() => { handleInquire(item.seller_id, item._id) }}>Seller Enquiry</button>
                                                            </div>
                                                        :
                                                        <div className="card_buttons">
                                                            <button className='likeUnlike_Button' onClick={authenticationRequired}>Like</button>
                                                            <button className='inquireButton' onClick={authenticationRequired}>Seller Enquiry</button>
                                                        </div>
                                                }


                                            </div>
                                        </div>
                                    )
                                })

                    }

                </div>

            </div>

            {
                isModalOpen ?
                    <div className="customEnqurie_Modal">

                        <div className="modalDetailBox">

                            <div className="modalCrossIcon"><button onClick={closeModal}>X</button></div>

                            {
                                modelloading ?
                                    <div className='loaderContianer'><div className="loader"></div><br /></div>
                                    :
                                    <div className="modalContent">
                                        <h1>Seller details of selected property</h1>
                                        <p><strong>Seller Fullname</strong> -<span> {enquireRes.seller_fullname}</span></p>
                                        <p><strong>Seller Email</strong> -<span> {enquireRes.seller_email}</span></p>
                                        <p><strong>Seller Contact No.</strong> -<span> {enquireRes.seller_phoneNumber}</span></p>
                                        <p><strong>Seller Business Name</strong> -<span> {enquireRes.seller_businessName}</span></p>
                                    </div>
                            }
                        </div>

                    </div>
                    : <></>
            }
        </div>
    )

}

export default LandingPage