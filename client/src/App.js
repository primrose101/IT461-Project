// import logo from './logo.svg';
import React from 'react';
import './App.css';
import DashboardProduct from './DashboardProduct';
import DashboardCustomer from './components/DashboardCustomer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/product" element={<DashboardProduct/>}/>
          <Route path="/dashboard/customer" element={<DashboardCustomer/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
