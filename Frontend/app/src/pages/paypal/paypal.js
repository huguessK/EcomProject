import React, {useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import PaypalSetup from './paypal-app.js'


const Paypal=()=>{

    const [backendData, setBackendData]=useState({});
    
    fetch("/api/cart-item-quantity").then(
        response=> response.json()
        ).then(
        data => {
          setBackendData(data)
          }
        )

    return(
        <>
         {Header(backendData["item"])}
         <PaypalSetup/>
       
        <Footer/>
        </>
    )
};



export default Paypal;