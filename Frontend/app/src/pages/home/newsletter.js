import React, {useState, useEffect} from "react";
import './home.css';



function NewsLetter(){

    const [email, setEmail] = useState("");
    //generate code
    let r = (Math.random() + 1).toString(36).substring(4);

    let handleSubmit = (event) => {

    //post email and discount code r to the server for processing
    if(email!=""){
      fetch("/api/newsletter", {
        method: "POST",
        headers :{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          newsletter: email,
          code: r
        })}).then(function(response) {
          
          return response.json();
  
      });
        event.preventDefault();
    }
     

        //show code or message
        let popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        popup.innerHTML="you have subscribed to the newsletter";
      }
   

  
    return (
      <div className="newsletter-subscribe mt-5 container">
          <div className="container">
              <div className="intro">
                  <h2 className="text-center newsletter">Subscribe to our Newsletter and get 10% discount on your cart </h2>
                  <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <form className="form-inline" onSubmit={handleSubmit} method="post">
                  <div className="form-group"><input className="form-control" type="email" name="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={email} placeholder="Your Email"
                    required onChange={(e) => setEmail(e.target.value)}
                  /></div>

                  <div className="form-group">
                  <div className="popup">
                  <button className="btn btn-primary" type="submit">Subscribe </button>
                  <span className="popuptext" id="myPopup"></span>
                  </div>
                  </div> {/* end tag className="form-group popup"*/}
              </form>
          </div>
      </div>
    )
  }
  

  export default NewsLetter;