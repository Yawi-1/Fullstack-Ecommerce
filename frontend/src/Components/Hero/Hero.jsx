import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';
import product_1 from '../Assets/product_30.png'
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
          <p>Quality</p>
          <img src={hand_icon} />
          </div>
        </div>
        <p>you</p>
        <p>can trust.</p>
      <div className="hero-latest-btn">
        <div>Latest Collection</div>
        <img src={arrow}/>
      </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
