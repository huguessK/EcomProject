import React,{ useState, useEffect }   from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
//import AcccountInfos from '../account-infos/account-infos.js';
import './login.css' 



const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [remember, setRemember] = useState(1);
  const [failedmessage, setFailedMessage] = useState("");
  
  let handleSubmit = (event) => {
    
      fetch("/login-data", {
        method: "POST",
        headers :{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: psw,
          remember: remember
        })}).then(function(response) {
          
          return response.json();

      });
      event.preventDefault();
    }

      //check for email and password in database

    const [loginstatus, setLoginstatus] = useState(2);

    fetch("/login-data").then(
      response=> response.json()
      ).then(
      data => {
        setLoginstatus(data["login"]);
        if(data["login"]===1){setFailedMessage("");}
        else{setFailedMessage("Please enter your email and password");}
        }
      )

        if(loginstatus===1){
          let previousPage=document.referrer;
          window.location.href=previousPage;
        }
           
  return(
  <div className="form-container">
  <form onSubmit={handleSubmit}>
      <div className="imgcontainer">
        <img src="Images/Other/log.jpg" alt="Avatar" className="avatar" />
      </div>

      <div className="container">
      {(loginstatus!=1)?(<p id="loginFailed">{failedmessage}</p> ):null}
      
      <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={email} required 
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" value={psw} required 
          onChange={(e) => setPsw(e.target.value)}
        />

        <button type="submit">Login</button>
        
        <label>
          <input type="checkbox"  name="remember" value={remember} checked
            onChange={() => setRemember(0)}/> Remember me
        </label>
      </div>

      <div className="container" style={{backgroundColor:"#f1f1f1"}}>
        
        {/*<span className="psw">Forgot <a href="#">password?</a></span>*/}
        <p>Don't have an account? <a href="/create-account">Create account</a></p>
      </div>
    </form>
    </div>

);}




const Login = () => {

  const [backendData, setBackendData]=useState({});

  useEffect(() => {

    const interval = setInterval(() => {
      
      fetch("/api/cart-item-quantity").then(
        response=> response.json()
        ).then(
        data => {
          setBackendData(data)
          }
        )

    }, 500);


  return () => clearInterval(interval);//fetch number of items added to cart each 0.5s
  }, []);
  
  
    return (
      <>
      {Header(backendData["item"])}
      <LoginForm/>
      <Footer/>
      </>
      
    )
}




export default Login;
