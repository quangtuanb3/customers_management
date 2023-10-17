import React, { useState, useEffect } from 'react';
import './modalStyle.css';
import avatarDefault from '../../assets/avatar-default.png'
import useCloudinaryFileUpload from '../../hooks/useCloudinaryFileUpload';

const cities = ["New York", "Los Angeles", "California", "Houston", "Chicago"];
const genders = ["Male", "Female", "Other"];
const hobbies = ["Soccer", "Gaming", "Music", "Volleyball", "Shopping"]

const CustomerModal = ({ show, handleClose, handleSaveCustomer, customer }) => {
    let { handleUpload, imageUrl, setImageUrl } = useCloudinaryFileUpload();

    const [editCustomer, setEditCustomer] = useState({});
    const [selectedGender, setSelectedGender] = useState(null);
    const [changedAvatar, setChangedAvatar] = useState(false);
    const [selectedHobbies, setSelectedHobbies] = useState(new Array(hobbies.length).fill(false));


    useEffect(() => {
        setEditCustomer(customer);
        setSelectedHobbies(customer.hobbies)
    }, [customer]);

    const handleChangeCustomer = (e) => {
        const { id, value } = e.target;
        setEditCustomer(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleChangeGender = (e) => {
        setSelectedGender(e.target.value);
        setEditCustomer(prevState => ({
            ...prevState,
            gender: e.target.value
        }));
    }

    const handleChangeHobbies = (e) => {
        const currentHobby = e.target.value;
        let updatedHobbies = [];
        if (!selectedHobbies) {
            updatedHobbies.push(currentHobby)
        } else {
            if (selectedHobbies.includes(currentHobby)) {
                updatedHobbies = selectedHobbies.filter(h => h !== currentHobby);
            } else {
                updatedHobbies = [...selectedHobbies, currentHobby];
            }
        }

        setSelectedHobbies(updatedHobbies);

        setEditCustomer(prevState => ({
            ...prevState,
            hobbies: updatedHobbies
        }));

    };



    // Inside handleUploadAvatar
    const handleUploadAvatar = async (e) => {
        console.log(e.target.files[0]);
        setChangedAvatar(false);
        await handleUpload(e.target.files[0]);
    };

    // Inside useEffect
    useEffect(() => {
        if (imageUrl !== '') {
            setEditCustomer(prev => ({
                ...prev,
                avatar: imageUrl,
            }));
            setChangedAvatar(true);
            setImageUrl(''); // Reset imageUrl after setting the editCustomer
        }
    }, [imageUrl]);


    const handleSave = () => {

        // Call the function to handle the creation of a new customer
        handleSaveCustomer(editCustomer);

        // Close the modal after saving
        handleClose();
    };

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} id="createCustomerModal" tabIndex="-1" aria-labelledby="createCustomerModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createCustomerModalLabel">Create New Customer</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className='row'>
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="avatar">
                                        <img
                                            src={editCustomer.avatar || avatarDefault}
                                            alt={`avatar-${customer.id}`}
                                            style={{ width: 75, height: 75, borderRadius: "50%" }}
                                        />
                                    </label>
                                    <input
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        style={{ display: "none" }}
                                        onChange={(event) => handleUploadAvatar(event)}
                                    />
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" value={editCustomer.fullName || ""} id="fullName" onChange={handleChangeCustomer} />
                                </div>
                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={editCustomer.email || ""} onChange={handleChangeCustomer} />
                                </div>
                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" value={editCustomer.phone || ""} onChange={handleChangeCustomer} />
                                </div>
                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <select className="form-select" value={editCustomer.city} id="city" onChange={handleChangeCustomer}>
                                        {cities.map(city => {
                                            return (
                                                <option key={city} value={city}>{city}</option>
                                            )
                                        })}

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label d-block">Gender</label>
                                    {genders.map(gender => {
                                        return (
                                            <div className="form-check form-check-inline" key={gender}>
                                                <input className="form-check-input visually-hidden"
                                                    type="radio" checked={editCustomer.gender === gender}
                                                    name="gender" id={gender} value={gender} onChange={handleChangeGender} />
                                                <label className="form-check-label btn btn-outline-primary" htmlFor={gender}>{gender}</label>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input className="form-control" id="address" rows="3" value={editCustomer.address || ""} onChange={handleChangeCustomer}></input>
                                </div>
                                <div className="mb-3 row">
                                    {hobbies.map(hobby => {
                                        return (
                                            <div key={hobby} className='col-lg-4'>
                                                <input type="checkbox" id={hobby} name={hobby} value={hobby} onChange={handleChangeHobbies} checked={selectedHobbies?.includes(hobby) || ''}></input>
                                                <label htmlFor={hobby}>{hobby}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save Customer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;
