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
  console.log(req.body)
  res.end()
});

app.post("/create-account-data", function (req, res) {
  console.log(req.body)
  res.end()
});


/**api cart */
let itemQuantity=0;

app.post("/api/cart-item-quantity", function (req, res) {
  itemQuantity+=req.body.item;
  if(itemQuantity<0){
    itemQuantity=0;
  }
  res.end();
});

app.get("/api/cart-item-quantity",(req,res)=>{
  res.json({"item":itemQuantity});
  
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