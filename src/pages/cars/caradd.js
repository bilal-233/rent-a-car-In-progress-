// src/pages/cars/caradd.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './car.css';  // Import the CSS file

const CarAdd = () => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(true);
    const navigate = useNavigate();

    const handleAddCar = () => {
        axios.post('http://localhost/api/cars.php', {
            make,
            model,
            year,
            color,
            price,
            availability
        })
        .then(response => {
            setMake('');
            setModel('');
            setYear('');
            setColor('');
            setPrice('');
            setAvailability(true);
            navigate('/cars');
        })
        .catch(error => {
            console.error('There was an error adding the car!', error);
        });
    };

    return (
        <div className="container">
            <h2 className="sub-header">Add Car</h2>
            <div className="form">
                <input
                    type="text"
                    value={make}
                    onChange={e => setMake(e.target.value)}
                    placeholder="Make"
                    className="input"
                />
                <input
                    type="text"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    placeholder="Model"
                    className="input"
                />
                <input
                    type="number"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="Year"
                    className="input"
                />
                <input
                    type="text"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    placeholder="Color"
                    className="input"
                />
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Price"
                    className="input"
                />
                <label className="label">
                    <input
                        type="checkbox"
                        checked={availability}
                        onChange={e => setAvailability(e.target.checked)}
                        className="checkbox"
                    />
                    Available
                </label>
                <button onClick={handleAddCar} className="button">Add Car</button>
            </div>
        </div>
    );
}

export default CarAdd;
