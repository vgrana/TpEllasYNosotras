import React from "react";

import bufanda from "./image/bufanda3.jpg";
import infinitos from "./image/infinitos2.jpg";
import portada from "./image/portada3.jpg";
import portada1 from "./image/portada4.jpg";
import "../App.css";
class Home extends React.Component {
  render() {
    return (
      <div className="container responsive-img">
        <div className="row">
          <div className="col s12 m12 ">
            <br></br>
            <div className="carousel carousel-slider ">
              <a className="carousel-item " href="" responsive-img>
                <img src={portada1} alt="" />
              </a>
              <a className="carousel-item" href="">
                <img src={infinitos} alt="" />
              </a>
              <a className="carousel-item" href="" responsive-img>
                <img src={bufanda} alt="" />
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
