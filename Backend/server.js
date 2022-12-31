//jshint esversion: 6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const request = require ("request");//not used in the end
const https= require("https");
const { isDataView } = require("util/types");
const bcrypt=require("bcrypt"); //salting and hashing passwords
const { fchownSync } = require("fs");
const saltRounds=10; //this value is enough

//for Cookies and Sessions
const session= require('express-session');
const passport= require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const { response } = require("express");
const cors=require("cors");

//creation of new express object
const app= express();
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ecomprojecthk.onrender.com"],
  })
);
app.use(express.json());


//for mongoose
mongoose.set('strictQuery', false);


/*
//maxAge=1h
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
  }
}));

app.use(passport.initialize());
app.use(passport.session());
*/


/**api cart */
let itemArray=[];

app.post("/api/cart-item-quantity", function (req, res) {
  let quantity=req.body.item;
  let id=req.body.id;
  let collectioname=req.body.collectionname;
  let color=req.body.color;
  let size=req.body.size;
  //console.log("my id type", typeof id);
  if(itemArray.length===0){
    if(quantity===1){
    console.log("quantity debut",quantity);
    itemArray.push({quantity:1, id:id, name:collectioname, color:[color], size:[size]});
    }
     //else ie : quantity=-1 or quantity=-1+v where v<0 (if remove button pressed) then nothing to do
  }
  else{ //itemArray not null
    let findid=0;
    for(let i=0; i<itemArray.length;i++){
      if( collectioname===itemArray[i].name && id===itemArray[i].id){

        if(quantity===-1){
          let findindex=-1;
          for(let u=0; u<itemArray[i].color.length;u++){
            if(color===itemArray[i].color[u]){
              findindex=u;
              break;
            }
          }
          if(findindex!=-1){ //->color!=all colors in itemArray[i].color
            itemArray[i].color = itemArray[i].color.filter((color,id) => id != findindex);
            itemArray[i].size = itemArray[i].size.filter((size,id) => id != findindex);
            itemArray[i].quantity-=1;
          }//end if findindex===-1
        }
        
        else if(quantity<-1){
          let index=[];
          //when remove button is pressed
          for (let u=0; u<itemArray[i].color.length;u++){
            if(color===itemArray[i].color[u]){
              index.push(u);
            }
          }
          const indexSet = new Set(index);
          itemArray[i].color = itemArray[i].color.filter((value, i) => !indexSet.has(i));
          itemArray[i].size = itemArray[i].size.filter((value, i) => !indexSet.has(i));
          itemArray[i].quantity=itemArray[i].color.length;
        }

        else{
          //quantity==1
          itemArray[i].color.push(color);
          itemArray[i].size.push(size);
          itemArray[i].quantity+=1;
        }
        console.log("quantity ajout meme item ou remove",quantity);
        findid=1;
        break;
      }// end if (collectioname===itemArray[i].name && id===itemArray[i].id)
 
    } //end for
    
    if(findid===0 && quantity===1){
      console.log("quantity nouvelle item",quantity);
      itemArray.push({quantity:1, id:id,name:collectioname,color:[color], size:[size]});
    }
    
  }//end else itemArray not null
  console.log(itemArray);
  res.end();
});


app.get("/api/cart-item-quantity",(req,res)=>{
  let totalcount=0;
  if(itemArray.length!=0){
    itemArray.forEach(item => {
      totalcount+=item.quantity;
    });
  }
  
  res.json({"item":totalcount, "login":loginstatus});
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
      //console.log(id,name);
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

let discountcode=[];

app.post("/api/newsletter",(req,res)=>{
  
  //check if email already exists in database

  Newsletter.findOne({email: req.body.newsletter},function(err,foundUser){
    if(err){
      res.send("something goes wrong! please try again.")
    }
    else{
      //only insert in db if user not found
      if(!foundUser){
        discountcode.push(req.body.code);
        const newsletterDatas = new Newsletter ({
          email: req.body.newsletter
        });
      
        
        newsletterDatas.save(function(err){
          if(err){
            res.send("something goes wrong, please try again!");
          }
          else{
            console.log("email added to newsletter db");
          }
        }); //to insert in the DB
        
      }
      else{
        console.log("this email already exists in newsletter db")
      }
      
    }
  })//end Newsletter

  res.end();
 
})


  
//price 

let price="";
app.post("/api/price",(req,res)=>{
 price=req.body.price;
 res.end();
})

app.get("/api/price",(req,res)=>{
  res.json({"price":price});
 })
 


/*dicscount code*/

app.get("/api/discount-code",(req,res)=>{
  res.json({"code":discountcode}); //discountcode=[code1,code2] or [code1]
});


/* get account-datas*/
let userEmail;
app.get("/account-datas",(req,res)=>{
//console.log("myuser",useremail);
  Account.findOne({email:useremail},function(err,foundUser){
    if(err){
      res.send("something goes wrong! please try again.")
    }
    else{ 
      if(foundUser){//should normally always be true
        console.log("usuerfound");
        userEmail=foundUser.email;
        let data={nam:foundUser.name,
          firstname: foundUser.firstname,
          email: foundUser.email,
          phone: foundUser.phone,
          address: foundUser.address
        };
        console.log(data);
        res.json(data);
      }
      else{
        console.log("not found");
        //console.log("mail",useremail);
      }
    } 
      
    });

});


/*update*/
app.post("/update",(req,res)=>{

let pwd="";
if(req.body.password!=""){//if user have changed password
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if(err){
      console.log(err);
    }
    else{
      pwd=hash;
    }
  });//end bcrypt.hash
}


  Account.findOne({email:req.body.email},function(err,foundUser){
    if(err){
      res.send("something goes wrong! please try again.")
    }
    else{
      if(foundUser){
        foundUser.address=req.body.address;
        if(pwd!=""){foundUser.password=pwd;} //hash value
        foundUser.phone=req.body.phone;

        foundUser.markModified("address");
        if(pwd!=""){ foundUser.markModified("password");}
        foundUser.markModified("phone");

        foundUser.save(function(err){
          if(err){
            console.log("updatError",err);
            res.send("something goes wrong, please try again!");
          }
          
        });

        res.end();
      }
    } 
});

});


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



/*send datas to db*/

//db setup

mongoose.connect("mongodb+srv://"+process.env.MONGODB_USERNAME+":"+process.env.MONGODB_PASSWORD+"@contactmessage.3sihltd.mongodb.net/EcomprojectDB",function(err){
  if(err){
    console.log("connection to db failed");
    console.log(err);
  } else{

    console.log("connection to db succeed");
  }

});


/*account db*/

const accountSchema = new mongoose.Schema ({
  name: String,
  firstname: String,
  address: String,
  email: String,
  password: String,
  phone: String
});

const Account = mongoose.model("Account", accountSchema);


/*Newsletter db*/

const newsletterSchema = new mongoose.Schema ({
  email: String
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);


/* login  */
let loginstatus=-2;
let useremail="";
let logout=-1;

app.post("/login-data", function (req, res) {
  console.log(req.body);

    let email= req.body.email;
    useremail=email;
    let password= req.body.password;
    //if(email.includes("email")){itemArray=[];}
    
    //search user in database
    Account.findOne({email:email},function(err,foundUser){
      if(err){
        res.send("something goes wrong! please try again.")
      }
      else{
        if(foundUser){
            //check for password
            bcrypt.compare(password, foundUser.password, function(err, result) {
              if(result===true){
                loginstatus=1;
                logout=1;
                
               
              }
              else{
                loginstatus=0;
                logout=0;
              }

              
              
          }); //end bcrypt.compare
          
        }

        //user not found
        else{
          loginstatus=-1;
          logout=0;
        }
      }
    })
    res.end();
});

app.get("/login-data", function (req, res) {
  res.json({"login":loginstatus});
});


/*logout*/


app.get("/api/logout",function(req,res){
    res.json({"logout":logout});
});


/*create account - 
create a new account if the email is not already used in another account*/
let AccountEmailAlredayUsed; 

app.post("/create-account-data", function (req, res) {
  //console.log(req.body)

  Account.findOne({email:req.body.email},function(err,foundUser){
    if(err){
      res.send("something goes wrong! please try again.")
    }
    else{
      if(foundUser){
        AccountEmailAlredayUsed=1;
        console.log("email already used")
      }

      else{
        AccountEmailAlredayUsed=0;
        //user not found
        //bcrypt to salt and hash password and save the hash value in the database
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          
          const accountDatas = new Account ({
            name: req.body.name,
            firstname: req.body.firstname,
            address: req.body.address,
            email: req.body.email,
            password: hash,
            phone: req.body.phone
          });
          
          accountDatas.save(function(err){
            if(err){
              res.send("something goes wrong, please try again!");
            }
            
          }); //to insert  in the DB

          });//end bcrypt.hash
            }
          }
  })//end Account.findOne

  res.end()
});



app.get("/create-account-data", function (req, res) {
  res.json({"alreadyused":AccountEmailAlredayUsed});
});



/*delete account*/
app.post("/delete-account",function(req,res){
  console.log("useremail",userEmail);
//delete account
  Account.deleteOne({ email: userEmail }, function (err) {
            if (err) {
               console.log("an error occurred while trying to delete the account");
            }
            else{
              console.log("an account was deleted");
            }
            
          });
       
res.end();
});


var port = process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port, ()=> {
  //console.log("Server has started successfully on port "+ port);
	console.log("Server has started successfully");
});