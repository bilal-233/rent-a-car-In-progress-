import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './millage.css'; // Import the CSS file

const MileageEdit = () => {
    const [userId, setUserId] = useState('');
    const [carId, setCarId] = useState('');
    const [day, setDay] = useState('');
    const [mileage, setMileage] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const Id = sessionStorage.getItem('Id');

    useEffect(() => {
        axios.get('http://localhost/api/mileage.php?id=' + Id)
            .then(response => {
                const mileage = response.data;
                setUserId(mileage.user_id);
                setCarId(mileage.car_id);
                setDay(mileage.day);
                setMileage(mileage.mileage);
                setTotalCost(mileage.total_cost);
            })
            .catch(error => {
                console.error('There was an error fetching the mileage data!', error);
            });

        axios.get('http://localhost/api/api.php')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users data!', error);
            });

        axios.get('http://localhost/api/cars.php')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cars data!', error);
            });
    }, [Id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost/api/mileage.php', {
            id: Id,
            userId,
            carId,
            day,
            mileage,
            totalCost
        })
        .then(response => {
            alert('Mileage updated successfully');
            navigate('/mileagelist');
        })
        .catch(error => {
            console.error('There was an error updating the mileage!', error);
        });
    }

    return (
        <div className="container">
            <h1 className="header">Edit Mileage</h1>
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
                    <select value={carId} onChange={(e) => setCarId(e.target.value)} required>
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
                    Total Cost:
                    <input type="number" value={totalCost} onChange={(e) => setTotalCost(e.target.value)} required />
                </label>
                <button type="submit" className="button">Submit</button>
            </form>
            <button onClick={() => navigate('/mileagelist')} className="button">Back to Mileage List</button>
        </div>
    );
}

export default MileageEdit;
