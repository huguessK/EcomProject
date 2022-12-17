import React,{ useState }   from 'react';
import { Outlet} from "react-router-dom";
import Banner from './banner.js';
import {BestSellingFashion,BestSellingSkinCare} from './bestselling.js';
import "./home.css";



 function ProductComponentV1(props){
    return (
      <div className="ProductComponentV1">
        <img src={props.img} alt={props.name}></img>
        <p>{props.description}</p>
      </div>
    )
  }





function FashionBestSelling(){
  //3 products displayed depending on screen size
return(
  
  <div class="container text-center">
  <div class="row">
      <div class="col-12 col-sm-4">
      {<ProductComponentV1 img={BestSellingFashion[0]["img"]} name={BestSellingFashion[0]["name"]}
 description={BestSellingFashion[0]["description"]}/>}
      </div>
      <div class="col-12 col-sm-4">
      {<ProductComponentV1 img={BestSellingFashion[1]["img"]} name={BestSellingFashion[1]["name"]}
 description={BestSellingFashion[1]["description"]}/>}
      </div>
      <div class="col-12 col-sm-4">
      {<ProductComponentV1 img={BestSellingFashion[2]["img"]} name={BestSellingFashion[2]["name"]}
 description={BestSellingFashion[2]["description"]}/>}
      </div>
      
  </div>
  </div>
  
)
}


function SkinCareBestSelling(){
   //2 products displayed depending on screen size
return(
  
  <div class="container text-center">
  <div class="row">
      <div class="col-12 col-sm-6">
      {<ProductComponentV1 img={BestSellingSkinCare[0]["img"]} name={BestSellingSkinCare[0]["name"]}
 description={BestSellingSkinCare[0]["description"]}/>}
      </div>
      <div class="col-12 col-sm-6">
      {<ProductComponentV1 img={BestSellingSkinCare[1]["img"]} name={BestSellingSkinCare[1]["name"]}
 description={BestSellingSkinCare[1]["description"]}/>}
      </div>
      
  </div>
  </div>
)
}



function Carousel(props){
  return(
    <div className="carousel-item active" data-bs-interval={props.time}>
      <img  src={props.img} className="d-block w-100 carousel-img" alt={props.name} />
    </div>
  )
}


function createBanner(Banner){
  return(

    <Carousel key={Banner.id}
    time={Banner.time}
    img={Banner.img}
    name={Banner.name}
     />
  )
}




const BestSeller=()=>{

   
   return(
     
  <div className="bestseller">
  <h1>Our Best-Sellers</h1>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button class="nav-link active" id="nav-fashion-tab" data-bs-toggle="tab" data-bs-target="#nav-fashion" type="button" role="tab" aria-controls="nav-fashion" aria-selected="true">Fashion</button>
      <button class="nav-link" id="nav-skincare-tab" data-bs-toggle="tab" data-bs-target="#nav-skincare" type="button" role="tab" aria-controls="nav-skincare" aria-selected="false">Skin care</button>
    </div>
  </nav>

    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-fashion" role="tabpanel" aria-labelledby="nav-fashion-tab" tabindex="0"><FashionBestSelling/></div>
      <div class="tab-pane fade" id="nav-skincare" role="tabpanel" aria-labelledby="nav-skincare-tab" tabindex="0"><SkinCareBestSelling/></div>
    </div>
  </div>
     
   )
 };
 








const Home = () => {
  return (
    <>
    
    <div id="carouselExampleInterval" className="carousel slide home-slide" data-bs-ride="carousel">
    <div className="carousel-inner">
     {Banner.map(createBanner)}
     </div>
     {/*<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>*/}
</div>
<BestSeller />
      <Outlet />
    </>
  )
};









export default Home;