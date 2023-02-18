import React, {useState, useEffect} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import './contact.css'


const Contact = () => {
  const [backendData, setBackendData]=useState({});

  useEffect(() => {  
      fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity")
      .then(response=> response.json())
      .then(
        data => {
          setBackendData(data);
          }
        )
  }, []);


    return (
      <>
      {Header(backendData["item"])}
      
      <div className="contact">
      <div className="container-contact">
      <div >
        <h2>Contact Us</h2>
        <p>You have a question about one of our products or about your order ? <br></br>
         Please fill in the form</p>
      </div>
      
      <div className="row">
        <div className="column">
          <img src="Images/Banner/FashionWomenThanksPexels.webp" alt="contact-image" />
        </div>
        <div className="column">
          <form>
            <label for="fname">First Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.." required/>
            <label for="lname">Last Name</label>
            <input type="text" id="lname" name="lastname" placeholder="Your last name.." required/>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" placeholder="Your email.." required/>
            <label for="order">Order Number</label>
            <input type="text" id="order" name="order" placeholder="Your Order Number.."  required/>
            <label for="message">Message</label>
            <textarea id="message" name="message" placeholder="Write something.." style={{height:'170px'}}></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      </div>
</div>
      
      <Footer/>
      </>
    )
  };
  
  export default Contact;