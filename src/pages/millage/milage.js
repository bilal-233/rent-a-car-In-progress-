import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './car.css';

const BookCar = () => {
    const { carId } = useParams();
    const [mileage, setMileage] = useState('');
    const [day, setDay] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [carsId, setCarId] = useState(carId || '');
    const [cars, setCars] = useState([]);
    const [cost, setCost] = useState(0);

    useEffect(() => {
        axios.get('http://localhost/api/api.php')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users data!', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost/api/cars.php')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cars data!', error);
            });
    }, []);

    useEffect(() => {
        const selectedCar = cars.find(car => car.id === carsId);
        if (selectedCar && day) {
            setCost(selectedCar.price * day);
        }
    }, [carsId, day, cars]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost/api/new.php', {
            carId: carsId,
            userId,
            day,
            mileage,
            cost
        })
        .then(response => {
            alert('Car booked and mileage recorded successfully');
        })
        .catch(error => {
            console.error('There was an error booking the car!', error);
        });
    }

    return (
        <div className="container">
            <h1 className="header">Book Car and Record Mileage</h1>
            <form onSubmit={handleSubmit} className="form">
                <label>
                    User:
                    <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Car:
                    <select value={carsId} onChange={(e) => setCarId(e.target.value)} required>
                        <option value="">Select a car</option>
                        {cars.map(car => (
                            <option key={car.id} value={car.id}>
                                {car.model}
                            </option>
                        ))}
                    </select>
                </label>
                
                <label>
                    Day:
                    <input type="number" value={day} onChange={(e) => setDay(e.target.value)} required />
                </label>
                <label>
                    Mileage:
                    <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
                </label>
                <label>
                    Cost:
                    <input type="number" value={cost} readOnly />
                </label>
                <button type="submit" className="button">Submit</button>
            </form>
            <Link to="../cars/cars.js" className="button">Back to Car List</Link>
        </div>
    );
}

export default BookCar;
