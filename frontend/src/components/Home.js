import React from "react";

import bufanda2 from "./image/bufanda2.jpg";
import infinitos from "./image/infinitos1.jpg";
import portada from "./image/portada.jpg";
import portada1 from "./image/portada2.jpg";
import "../App.css";
class Home extends React.Component {
  render() {
    console.log("estoy en home");
    return (
      <div className="container responsive-img">
        <div className="row">
          <div className="col s8 m12 push-s3 push-m0">
            <br></br>
            <div className="carousel carousel-slider ">
              <a className="carousel-item " href="" responsive-img>
                <img src={portada1} alt="" />
              </a>
              <a className="carousel-item" href="">
                <img src={infinitos} alt="" />
              </a>
              <a className="carousel-item" href="" responsive-img>
                <img src={bufanda2} alt="" />
              </a>
              <a className="carousel-item" href="" responsive-img>
                <img src={portada} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
