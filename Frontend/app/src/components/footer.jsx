import React,{ useState }   from 'react'; //remove useState if not used
import "./footer-header.css";

{/*contact page, about page, terms and conditions page...*/}
function Footer(){
    return (
       
<footer className="foot">

<div class="container text-center">
  <div class="row">
      <div class="col-4">
      <h6><a href="#">link 1</a></h6>
      <h6><a href="#">link 2</a></h6>
      <h6><a href="#">link 3</a></h6>
      </div>

     <div class="col-4">
     <h6><a href="#">link 4</a></h6>
     <h6><a href="#">link 5</a></h6>
     <h6><a href="#">link 6</a></h6>
      </div>

      <div class="col-4">
      <h6><a href="#">about me</a></h6>
      <h6><a href="#">contact me</a></h6>
      </div> 

      
  </div>
  </div>
        
</footer>
    )
}


export default Footer;