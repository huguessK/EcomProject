import React, {useState, useEffect} from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import './about.css'





const AboutText=()=>{
  return(
    <div className="textcontainer">
    <div className="mytext">
    <h1>Hi my name is Hugues</h1>
    <p>
    Normally in the About section of an ecommerce site, you are supposed to talk about your brand, <br></br> 
    your team and anything useful to give confidence to the customer. <br></br>
    As you may have noticed, this ecommerce site is a personal project.  <br></br>
    Feel free to check my <a href="https://github.com/huguessK/EcomProject" target="_blank">github </a>to see the source code of this project, <br></br>
    the technologies used and the features of this site.
    </p>
    <p>
    I accept any feedback to improve my project, for that you just have to <a href="https://webdev-soes.onrender.com/contact-me" target="_blank">fill this form</a>.
    [Thank you!]
    </p>
    </div>
  </div>
  )
}



const About = () => {
  const [backendData, setBackendData]=useState({});

  useEffect(() => {  
      fetch("/api/cart-item-quantity").then(
        response=> response.json()
        ).then(
        data => {
          setBackendData(data);
          }
        )
  }, []);


    return (
      <>
      {Header(backendData["item"])}
      <div className="about">
      <AboutText/>
      </div>
      <Footer/>
      </>
    )
  };
  
  export default About;