//jshint esversion: 6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const request = require ("request");//not used in the end
const https= require("https");


//creation of new espress object
const app= express();
//for post request
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());



app.get("/api/home",(req,res)=>{
    res.json({"home":["home1","home2","home3"]});
})



app.post("/login-data", function (req, res) {
  //console.log(req.body)
  res.end()
});

app.post("/create-account-data", function (req, res) {
  //console.log(req.body)
  res.end()
});


/**api cart */
let itemArray=[];
let totalitem=0;

app.post("/api/cart-item-quantity", function (req, res) {
  let quantity=req.body.item;
  let id=req.body.id;
  let collectioname=req.body.collectionname;
  let color=req.body.color;
  let size=req.body.size;
  //console.log("my id type", typeof id);
  if(itemArray.length===0){
    if(quantity>0){
    totalitem+=quantity;
    console.log("quantity debut",quantity);
    itemArray.push({quantity:quantity, id:id, name:collectioname, color:[color], size:[size]});
    }
  }
  else{
    let findid=0;
    for(let i=0; i<itemArray.length;i++){
      if( collectioname===itemArray[i].name && id===itemArray[i].id){
        //itemArray[i].quantity+=quantity;
        
        if(itemArray[i].quantity+quantity<0){
          //itemArray = itemArray.filter(item => item.id != id);
          itemArray[i].quantity=0;
        }
        else{
          itemArray[i].quantity+=quantity;
          totalitem+=quantity;
          if(quantity>0){
            itemArray[i].color.push(color);
            itemArray[i].size.push(size);
          }
          else{
            let index=0;
            for(let u=0; i<itemArray[i].color.length; u++){
              if(itemArray[i].color[u]===color){
                index=u;
                console.log("index",index);
                break;
              }
            }
            //itemArray[i].color = itemArray[i].color.splice(index, 1); //remove itemArray[i].color[idex] 
            //itemArray[i].size = itemArray[i].size.splice(index, 1);
            itemArray[i].color = itemArray[i].color.filter((item,id) => id != index);
            itemArray[i].size = itemArray[i].size.filter((item,id) => id != index);
          }
        }
        
     
        console.log("quantity ajout mm item",quantity);
        findid=1;
        break;
      }
    }//end for
    if(findid===0 && quantity>0){
      console.log("quantity nouvelle item",quantity);
      totalitem+=quantity;
      itemArray.push({quantity:quantity, id:id,name:collectioname,color:[color], size:[size]});
    }
    
  }
  console.log("total",totalitem);
  console.log(itemArray);
  res.end();
});


app.get("/api/cart-item-quantity",(req,res)=>{
  res.json({"item":totalitem});
});


app.get("/api/cart-item-quantity/:NAME/:ID",(req,res)=>{
  let name=req.params.NAME; //NAME='fashion-men-id', 'fashion-women-id', 'skin-care-id'
  let id=req.params.ID;
  //console.log("typename",typeof name);
  //console.log("typeid",typeof id);
  let returnval=0;
  for(let i=0; i<itemArray.length;i++){
    if(name===itemArray[i].name  && id===itemArray[i].id.toString()){
      returnval=itemArray[i].quantity;
      console.log(id,name);
      break;
    }
  }
  //console.log(itemArray);
  res.json({"currentquantity":returnval});
});

/*update product ..used in function  DecremItemadded()//the ID is important as we can have 
multiple products in a collection->used to identify each product*/

app.get("/api/cart-item-quantity/updateproduct/:NAME/:ID",(req,res)=>{
  let name=req.params.NAME; //NAME='fashion-men-id', 'fashion-women-id', 'skin-care-id'
  let id=req.params.ID;
  //console.log("type id",typeof id);
  let retval=0;
  for(let i=0; i<itemArray.length;i++){
    if(name===itemArray[i].name  && id===itemArray[i].id.toString()){
      retval=itemArray[i].color.length;
      break;
    }
  }
  res.json({"currentquantity":retval});
});


/*get all products add to cart*/
app.get("/api/all-products",(req,res)=>{
  res.json({"products":itemArray});
})

/*newsletter nb: add post method to catch datas in order to send to a server*/

app.get("/api/newsletter",(req,res)=>{
  res.json({"newsletterMail":req.body.newsletter});
})


/*product index*/
let productIndexFashionMen=0;
let productIdFashionMen=0;

let productIndexFashionWomen=0;
let productIdFashionWomen=0;

let productIndexSkinCare=0;
let productIdSkinCare=0;

app.post("/api/product-index-fashion-men", function (req, res) {
  productIndexFashionMen=req.body.index;
  productIdFashionMen=req.body.id;
  //console.log(req.body);
  res.end();
});

app.get("/api/product-index-fashion-men",(req,res)=>{
  res.json({"index":productIndexFashionMen, "id":productIdFashionMen});
})

app.post("/api/product-index-fashion-women", function (req, res) {
  productIndexFashionWomen=req.body.index;
  productIdFashionWomen=req.body.id;
  //console.log(req.body);
  res.end();
});

app.get("/api/product-index-fashion-women",(req,res)=>{
  res.json({"index":productIndexFashionWomen, "id":productIdFashionWomen});
})


app.post("/api/product-index-skin-care", function (req, res) {
  productIndexSkinCare=req.body.index;
  productIdSkinCare=req.body.id;
  //console.log(req.body);
  res.end();
});

app.get("/api/product-index-skin-care",(req,res)=>{
  res.json({"index":productIndexSkinCare, "id":productIdSkinCare});
})





var port = process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port, ()=> {
  //console.log("Server has started successfully on port "+ port);
	console.log("Server has started successfully");
});