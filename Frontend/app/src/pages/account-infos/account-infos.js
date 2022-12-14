
import React,{ useState, useEffect }   from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import './account-infos.css'



function Setting(){
  

//fetch account data
const [accountdatas, setAccountdatas] = useState({});
const [addr, setAddr] = useState("");
const [phone, setPhone] = useState(""); 
const [pawd, setPawd] = useState(""); 
let currentAddr;
let currentPhone;

useEffect(() => {
fetch("https://ecomzuzuserver.onrender.com/account-datas")
.then(response=> response.json())
.then(
  data => {
    setAccountdatas(data);
    setAddr(data.address);
    setPhone(data.phone);
    currentAddr=addr;
    currentPhone=phone;
    
    }
  )
},[]);//end useeffect


function Update(){
  
  if(addr!=currentAddr || phone!=currentPhone || pawd!=""){
  let data={
    email:accountdatas.email,
    address: addr,
    phone: phone,
    password:pawd
  }


  fetch("https://ecomzuzuserver.onrender.com/update", {
    method: "POST",
    headers :{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data)}).then(function(response) {
      
      return response.json();

  });

//show message "Saved!"
document.getElementById('saved').innerHTML="Saved!";

setTimeout(function() {
  document.getElementById('saved').innerHTML="";
    }, 1000);
  
    }//end if
}//end Update


    return(
      <>
      <h1>settings</h1>
      <div className="container">
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder={accountdatas.email}  disabled/>

        <label for="firstname"><b>Firstname</b></label>
        <input type="text" placeholder={accountdatas.firstname}  disabled/>

        <label for="name"><b>Name</b></label>
        <input type="text" placeholder={accountdatas.nam}  disabled/>

        <label for="address"><b style={{color: '#C291A4'}}>Address/</b></label>
        <input type="text" placeholder={addr+"  @type to change address"}
           onChange={(e) => {setAddr(e.target.value)}}
        />

        <label for="phone"><b style={{color: '#C291A4'}}>Phone/</b></label>
        <input type="text" placeholder={phone+"  @type to change phone"}
           onChange={(e) => setPhone(e.target.value)}
        />

      <label for="password"><b style={{color: '#C291A4'}}>Change password</b></label>
        <input type="text" placeholder="enter new password"
           onChange={(e) => setPawd(e.target.value)}
        />

        <button type="button" onClick={()=>Update()}>save changes</button>
        <span id="saved"></span>

    </div>
    </>
    )
}


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
                <button id="continue-shopping" style={{backgroundColor:'#C291A4', color:'white', fontSize:'20px', width:'180px'}} onClick={()=>{ window.location.href="/checkout-page";}}>Checkout</button>
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
.then(
  data => {
    setAllproducts(data.products);
    }
  )

 return(
  <>
   { (allproducts.length!=0)?(allproducts.map(CreateProductInfos)):
    (<h3 id="continue-shopping">No order to display. <span style={{color:'#C291A4'}}  onClick={()=>{ window.location.href="/";}}>Continue shopping</span></h3>)
    }
   </>
 )
 }



const InfosToDisplay=()=>{

  
  const [backendData, setBackendData]=useState({});

  useEffect(() => {

    const interval = setInterval(() => {
      
      fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity")
      .then(response=> response.json())
      .then(
        data => {
          setBackendData(data)
          }
        )

    }, 500);


  return () => clearInterval(interval);//fetch number of items added to cart each 0.5s
  }, []);


function handleDelete(){

 fetch("https://ecomzuzuserver.onrender.com/delete-account", {
   method: "POST",
     headers :{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email: "deleteaccount"
        })}).then(function(response) {
                  
       return response.json();
          
    });
     window.location.href="/";
}

  function handleClick(){
     
    fetch("https://ecomzuzuserver.onrender.com/login-data", {
      method: "POST",
      headers :{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email: "email",
        password: "",
        remember: false
      })}).then(function(response) {
        
        return response.json();

    });
  
  
    window.location.href="/";
  }


    return(
      <>
    {Header(backendData["item"])}
   <div className="accountinfos">
   <h1>Welcome</h1>
   <nav>
     <div className="nav nav-tabs" id="nav-tab" role="tablist">
       <button className="nav-link active" id="nav-orders-tab" data-bs-toggle="tab" data-bs-target="#nav-orders" type="button" role="tab" aria-controls="nav-orders" aria-selected="true">Orders Placed/Current Orders</button>
       <button className="nav-link" id="nav-setting-tab" data-bs-toggle="tab" data-bs-target="#nav-setting" type="button" role="tab" aria-controls="nav-setting" aria-selected="false">Setting</button>
       <button className="nav-link" id="nav-logout-tab" data-bs-toggle="tab" data-bs-target="#nav-logout" type="button" role="tab" aria-controls="nav-logout" aria-selected="false" onClick={()=>handleClick()}>Log out</button>
       <button className="nav-link" id="nav-logout-tab" data-bs-toggle="tab" data-bs-target="#nav-logout" type="button" role="tab" aria-controls="nav-logout" aria-selected="false" onClick={()=>handleDelete()}>Delete account</button>
     </div>
   </nav>
 
     <div className="tab-content" id="nav-tabContent">
       <div className="tab-pane fade show active" id="nav-orders" role="tabpanel" aria-labelledby="nav-orders-tab" tabindex="0"><Orders/></div>
       <div className="tab-pane fade" id="nav-setting" role="tabpanel" aria-labelledby="nav-setting-tab" tabindex="0"><Setting/></div>
       

     </div>
   </div>
   </>
  
    )
  };



  const AcccountInfos=()=>{
    return (
      <>
    <InfosToDisplay/>
    <Footer/>
    </>
    );

  }

  export default AcccountInfos;