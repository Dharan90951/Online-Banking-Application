import React from "react";
import product1 from '../components/image/p1.jpg'
import product2 from '../components/image/p2.jpg'
import product3 from '../components/image/p3.jpg'


const Home = () => {
  return (
    <>
      <div style={{ maxWidth: '100%', margin: 'auto', }} class="img-fluid"> {/* Limit width to 50% */}
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
          <button  type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active " aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img style={{height:'500px'}} src={product1} className="d-block w-100 img-fluid" alt="..." />
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={product2} style={{height:'500px'}} className="d-block w-100 img-fluid" alt="..." />
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className="carousel-item">
            <img src={product3} style={{height:'500px'}} className="d-block w-100 img-fluid" alt="..." />
            <div className="carousel-caption d-none d-md-block">
             
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Home;
