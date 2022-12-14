import React,{ useState, useEffect }   from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import './login.css'


const CreateForm = () => {

  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [addr, setAddr]=useState("");
  const [nam, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
 
  
  let handleSubmit = (event) => {
    
    
      fetch("https://ecomzuzuserver.onrender.com/create-account-data", {
        method: "POST",
        headers :{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          name: nam,
          firstname: firstname,
          address: addr,
          email: email,
          password: psw,
          phone: phone
        })}).then(function(response) {
          
          return response.json();

      });
      
      event.preventDefault();

      //check if the email used to create the account already exists in the database

      setTimeout(function() {
      fetch("https://ecomzuzuserver.onrender.com/create-account-data")
      .then(response=> response.json())
      .then(
        data => {
              if(data.alreadyused===0){
                //account have been created -> redirect user to login page
                window.location.href="/login"; 
              }
              else{//email already used 
                              
                    document.getElementById('emailused').innerHTML="This email is already used";

                    setTimeout(function() {
                      document.getElementById('emailused').innerHTML="";
                        }, 3000);
              }
          }
        )//end fetch
      }, 1000);
  }


  return(
  <div className="form-container">
  <form onSubmit={handleSubmit}>
      <div className="imgcontainer">
        <img src="Images/Other/log.jpg" alt="Avatar" className="avatar" />
      </div>

     
      <div className="container">

      <label for="firstname"><b>Firstname</b></label>
        <input type="text" placeholder="Enter Firstname" name="firstname" value={firstname} required 
          onChange={(e) => setFirstname(e.target.value)}
        />


    <label for="name"><b>Name</b></label>
        <input type="text" placeholder="Enter Name" name="name" value={nam} required 
          onChange={(e) => setName(e.target.value)}
        />

    <label for="address"><b>Address</b></label>
        <input type="text" placeholder="Enter address" name="addr" value={addr} required 
          onChange={(e) => setAddr(e.target.value)}
        />

<label for="phone"><b>Phone</b></label>
        <input type="text" placeholder="Enter tel 0033XXXXXX" name="phone" pattern="[0-9]+" title="Only number is allowed, no space" value={phone} required 
          onChange={(e) => setPhone(e.target.value)}
        />

        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={email} required 
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" value={psw} required 
          onChange={(e) => setPsw(e.target.value)}
        />

        <button type="submit">Create account</button>
        <span id="emailused"></span>
        
      </div>

      <div className="container" style={{backgroundColor:"#f1f1f1"}}>
          
          <p>Have an account? <a href="/login">login</a></p>
        </div>
      </form>
      </div>

);}


const CreateAccounte = () => {
    const [backendData, setBackendData]=useState({});

    useEffect(() => {
  
      const interval = setInterval(() => {
        
        fetch("https://ecomzuzuserver.onrender.com/api/cart-item-quantity")
        .then(response=> response.json())
        .then(
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
        <CreateForm/>
        <Footer/>
        </>
        
      )

}



export default CreateAccounte;