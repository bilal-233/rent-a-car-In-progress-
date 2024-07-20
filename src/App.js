// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CarList from './pages/cars/car';
import CarAdd from './pages/cars/caradd';
import MillageEdit from './pages/millage/milageedit';
import Millage from './pages/millage/milage';
import MillageAdd from './pages/millage/milageadd';
import CarEdit from './pages/cars/caredit';
import User from './pages/user/user';
import Useradd from './pages/user/useradd';
import Useredit from './pages/user/useredit'; 
// Import other components as needed

const App = () => (
    <Router>
        <div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cars">Cars</Link></li>
                    <li><Link to="/mileage">Mileage</Link></li>
                    <li><Link to="/user">Users</Link></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<CarList />} />
                <Route path="/add-car" element={<CarAdd />} />
                <Route path="/edit-car/:id" element={<CarEdit />} />
                <Route path="/mileage" element={<Millage />} />
                <Route path="/mileageadd" element={<MillageAdd />} />
                <Route path="/mileageedit" element={<MillageEdit />} />
                <Route path="/user" element={<User />} />
                <Route path="/useradd" element={<Useradd />} />
                <Route path="/useredit" element={<Useredit />} />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    </Router>
);

const Home = () => <div>Home Page</div>; // Placeholder for Home component



export default App;
