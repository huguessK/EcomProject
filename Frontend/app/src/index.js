import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.js";
import Contact from "./pages/contact/contact.js";
import FashionMen from "./pages/fashion-men/fashion-men.js";
import FashionWomen from "./pages/fashion-women/fashion-women.js";
import Login from "./pages/login/login.js";
import CreateAccounte from "./pages/login/account.js";
import Cart from "./pages/cart/cart.js";
import Question from "./pages/question/question.js";
import SkinCare from "./pages/skin-care/skin-care.js";
import About from "./pages/about/about.js";

export default function Ap() {
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact/>} />
          <Route path="fashion-men" element={<FashionMen />} />
          <Route path="fashion-women" element={<FashionWomen />} />
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccounte />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="question" element={<Question />} />
          <Route path="skin-care" element={<SkinCare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}










const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
   
    <Ap />  
  </React.StrictMode>
);







