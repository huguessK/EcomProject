import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Contact from "./pages/contact";
import FashionMen from "./pages/fashion-men";
import FashionWomen from "./pages/fashion-women";
import Login from "./pages/login";
import Cart from "./pages/cart";
import Question from "./pages/question";
import SkinCare from "./pages/skin-care";
import About from "./pages/about";

export default function Ap() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="contact" element={<Contact />} />
          <Route path="fashion-men" element={<FashionMen />} />
          <Route path="fashion-women" element={<FashionWomen />} />
          <Route path="login" element={<Login />} />
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







