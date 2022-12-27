import React, {useEffect, useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import './cart.css'


let cartItem=0;
let fetchdata=0; //to update cart page 


function ProductInCart(props){


  function IncremItemadded(){
    sendItemQuantity(1);
    fetchdata=2;
  }

  
  function DecremItemadded(){
    sendItemQuantity(-1);
    fetchdata=1;
  }

  function Remove(){
    /*for(let i=0; i<props.totalcount; i++){
      sendItemQuantity(-1);
    }*/
    sendItemQuantity(-props.totalcount-5); //to be sure that value always <-1 as props.totalcount>=0
    fetchdata=3;
  }

  //to get number of items added to cart
  function sendItemQuantity(quantity)
  {  
        
    fetch("/api/cart-item-quantity", {
            method: "POST",
            headers :{
              'Content-Type':'application/json',
            },
            body: JSON.stringify({
              item: quantity,
              id:props.id,
              collectionname: props.collectionname,
              color: props.color,
              size: props.size
            })}).then(function(response) {
              
              return response.json();

          });
          //event.preventDefault();
  }






    return (
      <div class="container container-fashion-page text-center">
      <div class="row">
      
        <div class="col-sm-4">
        <img src={props.img} alt={props.name}></img>
        </div>
    
        <div class="col-sm-6">
          <h3>Quantity Selected: {props.quantity}</h3>
          <button className="button-fashion-page button-add-home-fashion-page" onClick={IncremItemadded}>+</button>
          <button className="button-fashion-page button-add-home-fashion-page" onClick={DecremItemadded}>-</button>
          <button className="button-fashion-page button-add-home-fashion-page" style={{borderRadius: "25%"}}onClick={Remove}>Remove</button><br/>
        </div>
        
      </div>
      </div>
                        
  )
}




function CreateProductInCart(ProductObjet){

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
  
  

  //let size=ProductObjet.size;
  let imgpath=[];
  switch (collectionName) {
    case 'fashion-men':
      for(let i=0;i<NewArrayColor.length;i++){
        imgpath.push("Images/Fashion/Men/Prod"+productId+"/"+NewArrayColor[i]+".jpg");
      }
      break;
    case 'fashion-women':
      for(let i=0;i<NewArrayColor.length;i++){
        imgpath.push("Images/Fashion/Women/Prod"+productId+"/"+NewArrayColor[i]+".jpg");
      }
      break;
    default:
      for(let i=0;i<NewArrayColor.length;i++){
        imgpath.push("Images/SkinCare/Prod"+productId+"/"+NewArrayColor[i]+".jpg");
      }
      
  }



  return (
    (imgpath.map((url,index)=>{
      return(
        
      <ProductInCart 
      key={index}
      id={productId}
      img= {url}
      quantity={colorCount[index]}
      name="name"
      collectionname={collectionName}
      color={NewArrayColor[index]}
      size={NewArraySize[index]}
      totalcount={quantity}
      />);
    }))
  )

}



function Cart(){
  const [backendData, setBackendData]=useState({});
  
  
  fetch("/api/cart-item-quantity").then(
  response=> response.json()
  ).then(
  data => {
    setBackendData(data)
    //cartItem=data["item"];
    }
  )




  const [allproducts, setAllproducts]=useState([]);
  
    //get all products add to cart
   
  fetch("/api/all-products").then(
    response=> response.json()
    ).then(
    data => {
      setAllproducts(data.products);
      }
    )
  



    function redirectHome(){
      window.location.href="/";
    }


    let placeOrder=()=>{
          if(backendData["item"]>0){//if login && cart not empty
            window.location.href="/checkout-page";
          }
    }

    return (
      <>
      {Header(backendData["item"])}
      <div className="middle">
      {
      <div className="sticky">
          {backendData["item"]>0?
          (<button className="button-fashion-page button-add-home-fashion-page" onClick={placeOrder} style={{borderRadius: "10%"}}>Place Order</button>):null
          }
      </div>
      }
      {backendData["item"]===0?(<div className="emptycart"><h3 id="continue-shopping">Your cart is empty. <span style={{color:'#C291A4'}}  onClick={redirectHome}>Continue shopping</span></h3></div>):null}
      {allproducts.map(CreateProductInCart)}
      </div>
      <Footer/>
      </>
      
    )
  };
  
export default Cart;
export {cartItem};



 


 