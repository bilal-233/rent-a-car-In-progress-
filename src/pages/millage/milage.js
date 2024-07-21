import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './millage.css'; // Import the CSS file

const MileageList = () => {
    const [mileages, setMileages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost/api/new.php')
            .then(response => {
                console.log('API response:', response.data); // Log API response
                setMileages(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleEdit = (id) => {
        sessionStorage.setItem('editMileageId', id);
        navigate('/mileageedit');
    };

    return (
        <div className="container">
            <h1 className="header">Mileages</h1>
            <Link to="/mileageadd" className="button add-button">Add Mileage</Link>
            <table className="mileage-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Car ID</th>
                        <th>Day</th>
                        <th>Mileage</th>
                        <th>Total Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mileages.length === 0 ? (
                        <tr>
                            <td colSpan="6">No mileages found</td>
                        </tr>
                    ) : (
                        mileages.map(mileage => (
                            <tr key={mileage.id} className="mileage-row">
                                <td>{mileage.user_id}</td>
                                <td>{mileage.car_id}</td>
                                <td>{mileage.day}</td>
                                <td>{mileage.mileage}</td>
                                <td>{mileage.total_cost}</td>
                                <td>
                                    <button onClick={() => handleEdit(mileage.id)} className="button edit-button">Edit</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MileageList;
