import React, {useEffect, useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';

import './checkout-page.css'
import Product from '../fashion-men/product.js';




//let amount; //for paypal

function CreateProductInfos(ProductObjet){
    let collectionName=ProductObjet.name;
    let size=ProductObjet.size;
    let productId=ProductObjet.id;
    let colors=ProductObjet.color;
    let quantity=ProductObjet.quantity;
    let colorCount=[];
    let NewArrayColor=[];
    let NewArraySize=[];
    for(let i=0;i<quantity;i++){
     
      if(NewArrayColor.includes(colors[i])===false){
        NewArrayColor.push(colors[i]);
        NewArraySize.push(size[i]);
      }
    }//endfor
    NewArrayColor.forEach(color => {
      let count=0;
      for(let i=0; i<quantity;i++){
        if (color === colors[i]) {
          count += 1;
        }
      }
      colorCount.push(count);
    });
    
    return (
      (NewArrayColor.map((color,index)=>{
        return(
          <div>
            <div className="prod">
              <p>Category: {collectionName}</p>
              <p>Id: {productId}</p>
              {(!collectionName.includes("skin"))?
                (<><p>Color: {color}</p> <p>Size: {NewArraySize[index]}</p></>):null
              }
              
              <p>Quantity: {colorCount[index]}</p>
              <p>Price: ${Product[productId].price}</p>
              
            </div>
          </div>
  
        );
      }))
    )
  }


function Orders(){

const [allproducts, setAllproducts]=useState([]);

//get all products add to cart

fetch("https://ecomzuzuserver.onrender.com/api/all-products")
.then(response=> response.json())
.then(data => {setAllproducts(data.products);}
)

return(
<>
 {allproducts.map(CreateProductInfos)}
 </>
)
}


const Checkout=()=>{

    const [backendData, setBackendData]=useState({});
    
    fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity")
    .then(response=> response.json())
    .then(data => {setBackendData(data)})

    //automatic discount of 10% if the user subscribed to the newsletter
  
    const [reductionPercentage, setReduction]=useState(1);
    fetch("https://ecomzuzuserver.onrender.com/api/discount-code")
    .then(response=> response.json())
    .then(
      data => {
        if(data.code.length!=0){
          setReduction(10); 
          }

        fetch("https://ecomzuzuserver.onrender.com/api/price", {
          method: "POST",
          headers :{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            price: (reductionPercentage>1)?(backendData["item"]*(1-(1/reductionPercentage))):backendData["item"]
        
          })}).then(function(response) {
            
            return response.json();

        });

    })     
      

    return(
        <>
         {Header(backendData["item"])}
        {
         <div className="sticky">
         {(backendData["item"]>0)?
          (<button className="button-fashion-page button-add-home-fashion-page" style={{borderRadius: "10%", color:"#C291A4"}} onClick={()=>{window.location.href="/payment-page";}}><i class="bi bi-paypal"></i></button>):null}
      </div>
        }
        <div className="order-recap middle">
        <h1>Order recap</h1>
            <Orders/>
            <h3>Total: ${backendData["item"]}</h3> {/* each item cost $1 so Total=$numberOfItems*/}
            {(reductionPercentage===10)?
              ( <h3>Final Total ({reductionPercentage}% off): ${backendData["item"]*(1-(1/reductionPercentage))}</h3>):null}
        </div>
       
        <Footer/>
        </>
    )
};



export default Checkout;
