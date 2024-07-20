// // src/pages/cars/caredit.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import './car.css';  // Import the CSS file

// const CarEdit = () => {
//     const { id } = useParams();
//     const [car, setCar] = useState(null);
//     const [make, setMake] = useState('');
//     const [model, setModel] = useState('');
//     const [year, setYear] = useState('');
//     const [color, setColor] = useState('');
//     const [price, setPrice] = useState('');
//     const [availability, setAvailability] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get(`http://localhost/api/cars.php?id=${id}`)
//             .then(response => {
//                 const carData = response.data;
//                 setCar(carData);
//                 setMake(carData.make || ''); // Ensure fallback to empty string if null or undefined
//                 setModel(carData.model || '');
//                 setYear(carData.year || '');
//                 setColor(carData.color || '');
//                 setPrice(carData.price || '');
//                 setAvailability(carData.availability || true); // Ensure fallback to true if null or undefined
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the car data!', error);
//             });
//     }, [id]);

//     const handleEditCar = () => {
//         axios.put(`http://localhost/api/cars.php`, {
//             id,
//             make,
//             model,
//             year,
//             color,
//             price,
//             availability
//         })
//         .then(response => {
//             console.log('Car updated successfully:', response.data);
//             navigate('/cars');
//         })
//         .catch(error => {
//             console.error('There was an error updating the car!', error);
//         });
//     };

//     const handleDeleteCar = () => {
//         axios.delete(`http://localhost/api/cars.php`, {
//             data: { id }
//         })
//             .then(response => {
//                 console.log('Car deleted successfully:', response.data);
//                 navigate('/cars');
//             })
//             .catch(error => {
//                 console.error('There was an error deleting the car!', error);
//             });
//     };

//     if (!car) return <div>Loading...</div>;

//     return (
//         <div className="container">
//             <h2 className="sub-header">Edit Car</h2>
//             <div className="form">
//                 <input
//                     type="text"
//                     value={make}
//                     onChange={e => setMake(e.target.value)}
//                     placeholder="Make"
//                     className="input"
//                 />
//                 <input
//                     type="text"
//                     value={model}
//                     onChange={e => setModel(e.target.value)}
//                     placeholder="Model"
//                     className="input"
//                 />
//                 <input
//                     type="number"
//                     value={year}
//                     onChange={e => setYear(e.target.value)}
//                     placeholder="Year"
//                     className="input"
//                 />
//                 <input
//                     type="text"
//                     value={color}
//                     onChange={e => setColor(e.target.value)}
//                     placeholder="Color"
//                     className="input"
//                 />
//                 <input
//                     type="number"
//                     value={price}
//                     onChange={e => setPrice(e.target.value)}
//                     placeholder="Price"
//                     className="input"
//                 />
//                 <label className="label">
//                     <input
//                         type="checkbox"
//                         checked={availability}
//                         onChange={e => setAvailability(e.target.checked)}
//                         className="checkbox"
//                     />
//                     Available
//                 </label>
//                 <button onClick={handleEditCar} className="button">Save Changes</button>
//                 <button onClick={handleDeleteCar} className="button delete-button">Delete Car</button>
//             </div>
//         </div>
//     );
// }

// export default CarEdit;
