import React, {useState} from "react";
import './home.css'




function NewsLetter(){

    const [email, setEmail] = useState("");

    let handleSubmit = (event) => {
    
        fetch("/api/newsletter", {
          method: "POST",
          headers :{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            newsletter: email
          })}).then(function(response) {
            
            return response.json();
    
        });
        event.preventDefault();

        //show code
        let popup = document.getElementById("myPopup");
        popup.classList.toggle("show");

        //generate code
        let r = (Math.random() + 1).toString(36).substring(4);
        popup.innerHTML="Your code is : "+r;
    }


    return (
      <div className="newsletter-subscribe mt-5 container">
          <div className="container">
              <div className="intro">
                  <h2 className="text-center newsletter">Subscribe to our Newsletter and get a 10% discount code </h2>
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