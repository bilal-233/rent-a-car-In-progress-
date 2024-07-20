// src/pages/cars/car.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './car.css';  // Import the CSS file

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/api/cars.php')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="container">
            <h1 className="header">Cars</h1>
            <Link to="/add-car" className="button add-button">Add Car</Link>
            <ul className="car-list">
                {cars.map(car => (
                    <li key={car.id} className="car-item">
                        <div>
                            <strong>{car.make} {car.model}</strong> - {car.year} - {car.color} - ${car.price} - {car.availability ? 'Available' : 'Not Available'}
                        </div>
                        <Link to={`/edit-car/${car.id}`} className="button edit-button">Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CarList;
