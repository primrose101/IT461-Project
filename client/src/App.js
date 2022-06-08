// import logo from './logo.svg';
import React from 'react';
import './App.css';
import DashboardProduct from './components/DashboardProduct';
import DashboardCustomer from './components/DashboardCustomer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import DashboardBuy from './components/DashboardBuy';
import Aside from './components/Aside';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/product" element={<DashboardProduct/>}/>
          <Route path="/dashboard/customer" element={<DashboardCustomer/>}/>
          <Route path="/dashboard/buy" element={<DashboardBuy/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
