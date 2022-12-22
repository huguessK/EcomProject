import React, {useEffect, useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';



let cartItem=0;


function ProductInCart(props){

    return (
      <div class="container container-fashion-page text-center">
      <div class="row">
      
        <div class="col-sm-4">
        <img src={props.img} alt={props.name}></img>
        </div>
    
        <div class="col-sm-6">
          <h3>Quantity Selected: {props.quantity}</h3>
          <button className="button-fashion-page button-add-home-fashion-page" >+</button>
          <button className="button-fashion-page button-add-home-fashion-page" >-</button>
          <button className="button-fashion-page button-add-home-fashion-page" style={{borderRadius: "25%"}}>Remove</button><br/>
        </div>
        
      </div>
      </div>
                        
  )
}



function CreateProductInCart(ProductObjet){

  let collectionName=ProductObjet.name;
  let productId=ProductObjet.id;
  let colors=ProductObjet.color;
  let quantity=ProductObjet.quantity;
  let colorCount=[];
  let NewArrayColor=[];
  for(let i=0;i<quantity;i++){
    let count=0;
    if(NewArrayColor.includes(colors[i])===false){
      NewArrayColor.push(colors[i]);
    }
  colors.forEach(color => {
    
    if (color === colors[i]) {
      count += 1;
    }
  });
  colorCount.push(count);
  } 

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
      img= {url}
      quantity={colorCount[index]}
      name="name"
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
    }
  )
 

  //get all products add to cart

  const [allproducts, setAllproducts]=useState([]);

  fetch("/api/all-products").then(
    response=> response.json()
    ).then(
    data => {
      setAllproducts(data.products);
      }
    )

  
  //let itemquantity=document.getElementsByClassName('cart-item').innerHTML;
 // alert(itemquantity);
    return (
      <>
      {Header(backendData["item"])}
      {allproducts.map(CreateProductInCart)}
      <Footer/>
      </>
      
    )
  };
  
  export default Cart;
  export {cartItem};



 


 