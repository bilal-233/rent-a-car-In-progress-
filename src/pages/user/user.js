import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './use.css'; // Import the CSS file

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost/api/api.php')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleEdit = (id) => {
        sessionStorage.setItem('editUserId', id);
        navigate('/useredit');
    };

    return (
        <div className="container">
            <h1 className="header">Users</h1>
            <Link to="/useradd" className="button add-button">Add User</Link>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Identification Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="user-row">
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.user_type}</td>
                            <td>{user.age}</td>
                            <td>{user.city}</td>
                            <td>{user.contact}</td>
                            <td>{user.address}</td>
                            <td>{user.identification_number}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)} className="button edit-button">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
