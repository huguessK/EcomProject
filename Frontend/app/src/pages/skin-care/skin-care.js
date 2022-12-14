import React, {useEffect, useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import Product from './product.js'
import Parser from 'html-react-parser';
import './skin-care.css'


let productindexx=0;


function Option(imglength,text){

  let str='';
  for(let i=0; i<imglength;i++){
    str+='<option value='+(i)+'>'+text[i]+'</option>';
  }
  return (Parser(str));
 
}




/* start ProductComponentV1*/

function ProductComponentV1(props){

  const [selectedsize, SetSelectedsize] = useState("null");
  const [itemadded, setItemadded] = useState(0);
  const [quantity, setQuantity] = useState(0);
  //const [str, setStr] = useState(itemadded.toString(10));//base 10

  function IncremItemadded(){
      //setStr(itemadded.toString(10)+"+");
    setItemadded(1) ;
    sendItemQuantity(1);
    setQuantity(quantity+1);
  }

  
  function DecremItemadded(){
    
      setItemadded(-1);
    
    sendItemQuantity(-1);
    
    //to remove the products added to the cart, I also check the color to remove the right product
    //const [updateproduct, setUpdateproduct]=useState({"currentquantity":0});
  
      
  fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity/updateproduct/skin-care/"+(props.id))
  .then(response=> response.json())
  .then(
    data => {
      //setUpdateproduct(data);
      setQuantity(data.currentquantity);
      }
    )
    
    //setQuantity((quantity-1<=0)?0:(quantity-1));
  }


  //to get number of items added to cart
  function sendItemQuantity(quantity)
  {  
        
    fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity", {
            method: "POST",
            headers :{
              'Content-Type':'application/json',
            },
            body: JSON.stringify({
              item: quantity,
              id:props.id,
              collectionname: "skin-care",
              color: props.color,
              size: selectedsize
            })}).then(function(response) {
              
              return response.json();

          });
          setItemadded(0);
          //event.preventDefault();
  }


  function handleSelectChangeSize(event){
    let value = event.target.value;
    //alert(value);
    SetSelectedsize(value);
    
  }



  
  function handleSelectChange(event){
    let value = event.target.value;
    const searchindex = (element) => element ===value;
    let index=props.colorofproducts.findIndex(searchindex);
    productindexx+=1;
    //send data to back
    fetch("https://ecomzuzuserver.onrender.com/api/product-index-skin-care", {
      method: "POST",
      headers :{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        index: index,
        id : props.id,
      })}).then(function(response) {
        
        return response.json();

    });

  }

    return (
  <div class="container container-fashion-page text-center">
  <div class="row">
  
    <div class="col-sm-6">
    <img src={props.img} alt={props.name}></img>
    </div>

    <div class="col-sm-6">
      <h3>{props.title}</h3>
      <p>{Parser(props.description)}</p>

      <button className="button-fashion-page button-add-home-fashion-page" onClick={IncremItemadded}>+</button>
      <button className="button-fashion-page button-add-home-fashion-page" onClick={DecremItemadded}>-</button>
      <button className="button-fashion-page button-add-home-fashion-page" style={{borderRadius: "25%"}}>{quantity+props.quantity}</button><br/>
      
      <select  onChange={event => handleSelectChange(event)}>
          <option value="" disabled selected>See description</option>
          {Option(props.numberofproducts,props.colorofproducts)}
          
      </select>

      
      {/*<button className="button-fashion-page button-add-home-fashion-page" >size</button>*/}
    </div>
    
  </div>
  </div>
                    
    )
  }
/* end ProductComponentV1*/


/*start createProduct
Prod is a product end has the following features:
title, name, [multiple images], name and description*/
function CreateProduct(Prod){

  //to manage the color change--product can have different colors
  const [productindex, setProductindex]=useState({"index":0, "id":1});
  useEffect(() => {
      
      fetch("https://ecomzuzuserver.onrender.com/api/product-index-skin-care")
      .then(response=> response.json())
      .then(
        data => {
          if(data.id===Prod.id){
          setProductindex(data);
          }
          }
        )

  }, [productindexx]);

//to get current quantity

const [currentquantity, setCurrentquantity]=useState({"currentquantity":0});
useEffect(() => {
      
  fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity/skin-care/"+(Prod.id))
  .then(response=> response.json())
  .then(
    data => {
      setCurrentquantity(data);
      }
    )

}, []);
  
  return(

    <ProductComponentV1 key={Prod.id}
    id={Prod.id}
    title={Prod.title}
    img={Prod.img[productindex.index]["url"]}
    name={Prod.name}
    description={Prod.description}
    numberofproducts={Prod.colorofproducts.length}
    colorofproducts={Prod.colorofproducts}
    quantity={currentquantity.currentquantity}
    color={Prod.img[productindex.index]["color"]}
    size={Prod.img[productindex.index]["size"]}
    
    
     />
  )
}
/*end createProduct*/

/*start ProductImages*/

function ProductImages(ProductList){
return(
  
<>
      {ProductList.map(CreateProduct)}
</>
)
}
/*end ProductImages*/



function SkinCare(){
  const [backendData, setBackendData]=useState({});
  const [login, setLogin]=useState(0);
  
  useEffect(() => {

    const interval = setInterval(() => {
      
      fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity")
      .then(response=> response.json())
      .then(
        data => {
          setBackendData(data);
          setLogin(data.login);
          }
        )

    }, 500);


  return () => clearInterval(interval);//fetch number of items added to cart each 0.5s
  }, []);
  
  let cart=()=>{
    
    if(backendData["item"]>0 && login===1){window.location.href="/cart";}
    else{
      if(login!=1){
        window.location.href="/login"
      }
    }
  }
  

  
    return (
      <>
      {Header(backendData["item"])}
      <div className="sticky">
          <button className="button-fashion-page button-add-home-fashion-page" onClick={cart} style={{borderRadius: "10%"}}>Checkout</button>
      </div>
      {ProductImages(Product)}
      <Footer/>
      </>
      
    )
  };
  
  export default SkinCare;
  
