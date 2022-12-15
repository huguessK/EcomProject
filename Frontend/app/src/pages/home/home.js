import { Outlet} from "react-router-dom";
import Banner from './banner.js';
import "./home.css";


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




const Home = () => {
  return (
    <>
    
    <div id="carouselExampleInterval" className="carousel slide home-slide" data-bs-ride="carousel">
    <div className="carousel-inner">
     {Banner.map(createBanner)}
     </div>
     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      <Outlet />
    </>
  )
};




/*
const Home = () => {
  return (
    <>
    
    <div>
      <h1>welcome to home page</h1>
    </div>

      <Outlet />
    </>
  )
};
*/









export default Home;