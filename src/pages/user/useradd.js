import React, { useState } from 'react';
import axios from 'axios';
import './user.css'; // Import the CSS file

const Useradd = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');

    const handleAddUser = () => {
        axios.post('http://localhost/api/api.php', {
            name,
            email,
            user_type: userType,
            age,
            city,
            contact,
            address,
            identification_number: identificationNumber
        })
        .then(response => {
              // Handle successful user addition, e.g., navigate back to user list or show a success message
        setName('');
        setEmail('');
        setUserType('');
        setAge('');
        setCity('');
        setContact('');
        setAddress('');
        setIdentificationNumber('');
        })
        .catch(error => {
            console.error('There was an error adding the user!', error);
        });
    };

    return (
        <div className="form">
            <h2>Add User</h2>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                className="input"
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="input"
            />
            <input
                type="text"
                value={userType}
                onChange={e => setUserType(e.target.value)}
                placeholder="User Type"
                className="input"
            />
            <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="Age"
                className="input"
            />
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="City"
                className="input"
            />
            <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="Contact"
                className="input"
            />
            <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Address"
                className="input"
            />
            <input
                type="text"
                value={identificationNumber}
                onChange={e => setIdentificationNumber(e.target.value)}
                placeholder="Identification Number"
                className="input"
            />
            <button onClick={handleAddUser} className="button">Add User</button>
        </div>
    );
};

export default Useradd;
