import React from 'react';
import './login.css'


const Login = () => {
  return(
  <div className="form-container">
  <form action="" method="">
      <div className="imgcontainer">
        <img src="Images/Other/log.jpg" alt="Avatar" className="avatar" />
      </div>

      <div className="container">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <button type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember me
        </label>
      </div>

      <div className="container" style={{backgroundColor:"#f1f1f1"}}>
        <button type="button" className="cancelbtn">Cancel</button>
        <span className="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
    </div>

);}



export default Login;