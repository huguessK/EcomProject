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
});

app.post("/create-account-data", function (req, res) {
  console.log(req.body)
});


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


app.get("/api/newsletter",(req,res)=>{
  res.json({"newsletterMail":req.body.newsletter});
})





var port = process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port, ()=> {
  //console.log("Server has started successfully on port "+ port);
	console.log("Server has started successfully");
});