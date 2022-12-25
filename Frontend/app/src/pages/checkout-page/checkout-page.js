import React, {useEffect, useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';

import './checkout-page.css'




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
              <p>category: {collectionName}</p>
              <p>id: {productId}</p>
              <p>color: {color}</p>
              <p>quantity: {colorCount[index]}</p>
              <p>size: {NewArraySize[index]}</p>
            </div>
          </div>
  
        );
      }))
    )
  }


function Orders(){

const [allproducts, setAllproducts]=useState([]);

//get all products add to cart

fetch("/api/all-products").then(
response=> response.json()
).then(
data => {
  setAllproducts(data.products);
  }
)

return(
<>
 {allproducts.map(CreateProductInfos)}
 </>
)
}


const Checkout=()=>{

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
         <div className="sticky">
          <button className="button-fashion-page button-add-home-fashion-page" style={{borderRadius: "10%", color:"#C291A4"}} onClick={()=>{window.open("/payment-page", '_blank', 'noopener,noreferrer')}}><i class="bi bi-paypal"></i></button>
      </div>
        <div className="order-recap">
        <h1>Order recap</h1>
            <Orders/>
            <h3>Total: ${backendData["item"]}</h3> {/* each item cost $1 so Total=numberOfItems*/}
        </div>
       
        <Footer/>
        </>
    )
};



export default Checkout;