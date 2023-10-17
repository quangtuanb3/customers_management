import React from 'react';
import Card from './Card';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import CustomerModal from './CustomerModal';
import { useState } from 'react';

const data = [
    {
        id: 1,
        fullName: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        gender: "Male",
        hobbies: ["Gaming", "Music", "Soccer"],
        city: "New York",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        address: "1234 Street, Apt 101"
    },
    {
        id: 2,
        fullName: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        hobbies: ["Music", "Shopping"],
        gender: "Female",
        city: "Los Angeles",
        address: "5678 Avenue, Suite 202"
    },
    {
        id: 3,
        fullName: "Bob Johnson",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        email: "bjohnson@example.com",
        phone: "555-555-5555",
        gender: "Male",
        hobbies: ["Music", "Shopping", "Coding"],
        city: "Chicago",
        address: "9101 Boulevard, Unit 303"
    },
    {
        id: 4,
        fullName: "Alice Williams",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        email: "awilliams@example.com",
        phone: "111-222-3333",
        gender: "Female",
        hobbies: ["Volleyball", "Shopping", "Coding"],
        city: "Houston",
        address: "2468 Road, Suite 404"
    }
];

const CustomersIndex = () => {
    const [show, setShow] = useState(false);
    const [customer, setCustomer] = useState({})
    // const [deleted, setDeleted] = useState(false);

    const handleClose = () => {
        setCustomer({})
        setShow(false);

    };

    const handleShow = () => {
        setShow(true);
        setCustomer({})
    }

    const handleClickEditBtn = (id) => {
        handleShow();
        const currentCustomer = data.find(c => c.id === id);
        setCustomer(currentCustomer);
    }

    const handleSaveCustomer = (customer) => {
        if (customer.id) {
            const existedCustomerIndex = data.findIndex(c => c.id === customer.id)
            if (existedCustomerIndex !== -1) {
                data[existedCustomerIndex] = customer;
            } else {
                alert("Customer not found")
            }
        } else {
            const nextId = data.reduce((max, obj) => (obj.id > max ? obj.id : max), 0) + 1;
            customer.id = nextId;
            console.log(customer.id)
            data.unshift(customer)
        }
    }

    const handleDeleteCustomer = (id) => {
        const isConfirmed = window.confirm("Are you sure?");
        if (isConfirmed) {
            const existedCustomerIndex = data.findIndex((c) => c.id === id);
            const newData = data.splice(existedCustomerIndex, 1);
            // Make sure to update the state or re-render the component to reflect the changes in the UI.\
            setCustomer(newData);
        }
    };


    return (
        <>
            <NavBar />
            <Button variant="primary" style={{ margin: "0 0 20px 20px" }} onClick={handleShow}>Add new</Button>
            <Card customers={data} handleClickEditBtn={handleClickEditBtn} handleDeleteCustomer={handleDeleteCustomer} />
            <CustomerModal show={show} handleClose={handleClose} customer={customer} handleSaveCustomer={handleSaveCustomer} />
        </>
    )
}
export default CustomersIndex;