import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './user.css'; // Ensure you have the CSS file

const UserEdit = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [identification_number, setIdentificationNumber] = useState('');
    const navigate = useNavigate();
    const id = sessionStorage.getItem('editUserId');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost/api/api.php?id=${id}`)
                .then(response => {
                    const userData = response.data;
                    setUser(userData);
                    setName(userData.name || '');
                    setEmail(userData.email || '');
                    setUserType(userData.user_type || '');
                    setAge(userData.age || '');
                    setCity(userData.city || '');
                    setContact(userData.contact || '');
                    setAddress(userData.address || '');
                    setIdentificationNumber(userData.identification_number || '');
                })
                .catch(error => {
                    console.error('There was an error fetching the user data!', error);
                });
        }
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'user_type') setUserType(value);
        if (name === 'age') setAge(value);
        if (name === 'city') setCity(value);
        if (name === 'contact') setContact(value);
        if (name === 'address') setAddress(value);
        if (name === 'identification_number') setIdentificationNumber(value);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.put(`http://localhost/api/api.php?id=${id}`, {
    //         name,
    //         email,
    //         user_type,
    //         age,
    //         city,
    //         contact,
    //         address,
    //         identification_number
    //     })
    //         .then(response => {
    //             console.log('User updated successfully:', response.data);
    //             navigate('/user');
    //         })
    //         .catch(error => {
    //             console.error('There was an error updating the user!', error);
    //         });
    // };
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name,
            email,
            user_type,
            age,
            city,
            contact,
            address,
            identification_number
        };
        console.log('Updating user with data:', userData);
    
        axios.put(`http://localhost/api/api.php?id=${id}`, userData)
            .then(response => {
                console.log('User updated successfully:', response.data);
                navigate('/user');
            })
            .catch(error => {
                console.error('There was an error updating the user!', error);
            });
    };
    

    const handleDeleteUser = () => {
        if (id) {
            axios.delete(`http://localhost/api/api.php?id=${id}`)
                .then(response => {
                    console.log('User deleted successfully:', response.data);
                    navigate('/user');
                })
                .catch(error => {
                    console.error('There was an error deleting the user!', error);
                });
        } else {
            console.error('No user ID found!');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="form">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="input"
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="input"
                />
                <input
                    type="text"
                    name="user_type"
                    value={user_type}
                    onChange={handleInputChange}
                    placeholder="User Type"
                    className="input"
                />
                <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    className="input"
                />
                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="input"
                />
                <input
                    type="text"
                    name="contact"
                    value={contact}
                    onChange={handleInputChange}
                    placeholder="Contact"
                    className="input"
                />
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="input"
                />
                <input
                    type="text"
                    name="identification_number"
                    value={identification_number}
                    onChange={handleInputChange}
                    placeholder="Identification Number"
                    className="input"
                />
                <button type="submit" className="button">Update User</button>
                <button type="button" onClick={handleDeleteUser} className="button delete-button">Delete User</button>
            </form>
        </div>
    );
}

export default UserEdit;
