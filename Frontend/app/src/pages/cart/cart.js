import React, {useEffect, useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';

let cartItem=0;

function Cart(){
  const [backendData, setBackendData]=useState({});

  useEffect(() => {
  fetch("/api/cart-item-quantity").then(
  response=> response.json()
  ).then(
  data => {
    setBackendData(data)
    }
  )
  }, []);
  
  //let itemquantity=document.getElementsByClassName('cart-item').innerHTML;
 // alert(itemquantity);
    return (
      <>
      {Header(backendData["item"])}
      <h1>Welcome to cart page</h1>
      <Footer/>
      </>
      
    )
  };
  
  export default Cart;
  export {cartItem};



 


 