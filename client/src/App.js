// import logo from './logo.svg';
import React from 'react';
import './App.css';
import DashboardProduct from './DashboardProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/dashboard/product" element={<DashboardProduct/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
