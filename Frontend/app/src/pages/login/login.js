import React,{ useState }   from 'react';
import './login.css'


const Login = () => {

  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [remember, setRemember] = useState("false");
  
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



  return(
  <div className="form-container">
  <form onSubmit={handleSubmit}>
      <div className="imgcontainer">
        <img src="Images/Other/log.jpg" alt="Avatar" className="avatar" />
      </div>

      <div className="container">
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
          <input type="checkbox"  name="remember" value={remember}
            onChange={() => setRemember("true")}/> Remember me
        </label>
      </div>

      <div className="container" style={{backgroundColor:"#f1f1f1"}}>
        
        <span className="psw">Forgot <a href="#">password?</a></span>
        <p>Don't have an account? <a href="/create-account">Create account</a></p>
      </div>
    </form>
    </div>

);}


export default Login;
