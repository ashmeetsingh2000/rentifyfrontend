import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Nav from './Components/Nav';

import LandingPage from './Components/LandingPage';

import LoginBuyer from './Components/Auth/LoginBuyer';
import LoginSeller from './Components/Auth/LoginSeller';

import RegisterBuyer from './Components/Auth/RegisterBuyer';
import RegisterSeller from './Components/Auth/RegisterSeller';

import SellerProperty from './Components/Property/SellerProperty';
import SellerPropertyEdit from './Components/Property/SellerPropertyEdit';

import Footer from './Components/Footer';


const App = () => {
  return (
    <Router>

      <Nav />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginbuyer" element={<LoginBuyer />} />
        <Route path="/loginseller" element={<LoginSeller />} />
        <Route path="/registerbuyer" element={<RegisterBuyer />} />
        <Route path="/registerseller" element={<RegisterSeller />} />
        <Route path="/sellerproperty" element={<SellerProperty />} />
        <Route path="/sellerproperty/:id" element={<SellerPropertyEdit />} />
      </Routes>

      <Footer />

    </Router>
  );
};

export default App;