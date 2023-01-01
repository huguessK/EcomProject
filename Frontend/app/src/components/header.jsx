
import React,{ useState, useEffect}   from 'react'; //remove useState if not used
import "./footer-header.css";



function Header(valItem){

//check if login or not
const [logoutstatus, setLogoutstatus] = useState(2);
const [logincolor, setColor] = useState("white");

useEffect(() => {
  const interval = setInterval(() => {
fetch("https://ecomzuzuserver.onrender.com/api/logout")
.then(response=> response.json())
  .then(data => {
    console.log(data);
    setLogoutstatus(data["logout"]);
    if(data["logout"]===1){
      setColor("#C291A4");
    }
    else{
      setColor("white");
    }
    }
  )

}, 500);
  
  return () => clearInterval(interval);//fetch number of items added to cart each 0.5s
}, []);


  function handlelogin(){
    if(logoutstatus===1){//if login =true
      window.location.href="/account-infos";
    }
    else{
      window.location.href="/login";
    }
  }


    return (
        
    <header>
    <div className="header-banner">
      <b><p>Order by 12/25 for free shipping! This offer is valid for orders over $xx.</p></b>
    </div>

    <div className="navigation-bar">
      <nav className="navbar navbar-expand-lg">
    
            <div className="container-fluid">
    
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <a className="navbar-brand" href="/"><span style={{fontFamily:'Ubuntu'}}>HuguesK</span><i className="bi bi-amd" style={{fontSize: '1.5rem'}}></i></a>
                <ul  className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
                    <li className="nav-item"><a style={{color: 'white'}} className="nav-link active" href="/">Home</a></li>
                    <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" style={{color: 'white'}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Products</a>
                    
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><a className="dropdown-item" href="/skin-care">Skin care</a></li>
                      <li className="dropdown-item dropdown"><a className="nav-link dropdown-toggle" href="#"  data-bs-toggle="dropdown" aria-expanded="false">Fashion</a>
                   
                          <ul className="no-bullets">
                            <li><a className="dropdown-item" href="/fashion-men">Men</a></li>
                            <li><a className="dropdown-item" href="/fashion-women">Women</a></li>
                          </ul>
                     
                        
                      </li>{/*Fashion tag for Products item */}
        
                    </ul>
                      
              
                    
                    </li> {/*Fashion tag for Products item */}
                    <li className="nav-item"><a style={{color: 'white'}} className="nav-link active" href="/about">About</a></li>
                    <li className="nav-item"><a style={{color: 'white'}} className="nav-link active" href="/contact">Contact</a></li>
                </ul>

                <ul className="navbar-nav navbar-right icons">
                  <li className="login"><a  onClick={()=>handlelogin()}><i className="bi bi-person" style={{fontSize: '1.5rem', color:(logincolor)}} ></i></a></li>
                  <li><a href="/question"><i className="bi bi-question-circle" style={{fontSize: '1.5rem'}}></i></a></li>
                  <li><a href="/cart"><i id="cart" className="bi bi-cart" style={{fontSize: '1.5rem', color:(logincolor)}}>
                  <span className="cart-item" style={{color: (logincolor)}}><b>{valItem}</b></span>
                  </i></a></li>
                </ul>
                
              </div>
                </div>
      </nav>
</div>
</header>

    )
}

export default Header;