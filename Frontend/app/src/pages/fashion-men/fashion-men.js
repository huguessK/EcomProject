import React, {useEffect, useState} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import Product from './product.js'
import Parser from 'html-react-parser';
import './fashion-men.css'

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


  const [itemadded, setItemadded] = useState(0);
  //const [str, setStr] = useState(itemadded.toString(10));//base 10

  function IncremItemadded(){
      //setStr(itemadded.toString(10)+"+");
    setItemadded(1) ;
    sendItemQuantity(1);
  }

  
  function DecremItemadded(){

      //setStr(itemadded.toString(10));
      setItemadded(-1);
      //setStr(itemadded.toString(10));
    
    sendItemQuantity(-1);
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
              item: quantity
            })}).then(function(response) {
              
              return response.json();

          });
          setItemadded(0);
          //event.preventDefault();
  }


  function handleSelectChange(event){
    let value = event.target.value;
    const searchindex = (element) => element ===value;
    let index=props.colorofproducts.findIndex(searchindex);
    productindexx+=1;
    //send data to back
    fetch("/api/product-index-fashion-men", {
      method: "POST",
      headers :{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        index: index,
        id : props.id
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
      <button className="button-fashion-page button-add-home-fashion-page" style={{borderRadius: "25%"}}>checkout</button><br/>
      
      <select  onChange={event => handleSelectChange(event)}>
          <option value="" disabled selected>Choose your color</option>
          {Option(props.numberofproducts,props.colorofproducts)}
          
      </select>
      <button className="button-fashion-page button-add-home-fashion-page" >size</button>
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

  const [productindex, setProductindex]=useState({"index":0, "id":1});
  useEffect(() => {
      
      fetch("/api/product-index-fashion-men").then(
        response=> response.json()
        ).then(
        data => {
          if(data.id===Prod.id){
          setProductindex(data);
          }
          }
        )

  }, [productindexx]);
  
  
  return(

    <ProductComponentV1 key={Prod.id}
    id={Prod.id}
    title={Prod.title}
    img={Prod.img[productindex.index]["url"]}
    name={Prod.name}
    description={Prod.description}
    numberofproducts={Prod.colorofproducts.length}
    colorofproducts={Prod.colorofproducts}
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



function FashionMen(){
  const [backendData, setBackendData]=useState({});

  useEffect(() => {

    const interval = setInterval(() => {
      
      fetch("/api/cart-item-quantity").then(
        response=> response.json()
        ).then(
        data => {
          setBackendData(data)
          }
        )

    }, 500);


  return () => clearInterval(interval);//fetch number of items added to cart each 0.5s
  }, []);
  
  
    return (
      <>
      {Header(backendData["item"])}
      {ProductImages(Product)}
      <Footer/>
      </>
      
    )
  };
  
  export default FashionMen;
  



 


 