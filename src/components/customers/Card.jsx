import React from "react";
import avatar from '../../assets/c1.jpg';
import avatarDefault from '../../assets/avatar-default.png'


const Card = ({ customers, handleClickEditBtn, handleDeleteCustomer }) => {



    return (
        <div className="container">
            <div className="row">
                {customers.map((customer, index) => (
                    <div key={index} className="col-md-6" style={{ marginBottom: 20 }}>
                        <div className="card mb-3 position-relative">
                            <div className="card-body" >
                                <div className="d-flex justify-content-end mb-2">
                                    <button className="btn btn-primary me-2" onClick={() => handleClickEditBtn(customer.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => { handleDeleteCustomer(customer.id) }}>Delete</button>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <img src={customer.avatar || avatarDefault} style={{ width: 70, height: 70, borderRadius: "50%" }} alt="avatar" />
                                    <h5 className="card-title ms-3 mb-0">Full Name: {customer.fullName}</h5>
                                </div>
                                <p className="card-text">Email: {customer.email}</p>
                                <p className="card-text">Phone: {customer.phone}</p>
                                <p className="card-text">Gender: {customer.gender}</p>
                                <p className="card-text">Hobbies: {customer.hobbies.join(", ")}</p>
                                <p className="card-text">City: {customer.city}</p>
                                <p className="card-text">Address: {customer.address}</p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
