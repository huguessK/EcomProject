import React, {useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import './size.css'


function SizeMen(){

    const [backendData, setBackendData]=useState({});
    
    fetch("/api/cart-item-quantity").then(
        response=> response.json()
        ).then(
        data => {
          setBackendData(data)
          }
        )
return (
    <>
    {Header(backendData["item"])}
    <div className="mydiv">
    <img src="Images/Size/size1.webp" alt="size image"></img>
    </div>
    <Footer/>
    </>
          )  
}



function SizeWomen(){

    const [backendData, setBackendData]=useState({});
    
    fetch("/api/cart-item-quantity").then(
        response=> response.json()
        ).then(
        data => {
          setBackendData(data)
          }
        )
return (
    <>
    {Header(backendData["item"])}
    <div className="mydiv">
    <img src="Images/Size/size2.jpg" alt="size image"></img>
    </div>
    <Footer/>
    </>
          )  
}

export {SizeMen, SizeWomen};