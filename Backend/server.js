//jshint esversion: 6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const request = require ("request");//not used in the end
const https= require("https");

//creation of new espress object
const app= express();
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









var port = process.env.PORT;
if(port==null || port==""){
  port=5000;
}

app.listen(port, ()=> {
  //console.log("Server has started successfully on port "+ port);
	console.log("Server has started successfully");
});