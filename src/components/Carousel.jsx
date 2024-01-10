import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function Carousel() {
  const sliderStyle = "text-center";
  const imageStyle = "w-full h-[550px] overflow-x-hidden";

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      <div className={sliderStyle}>
        <Link to="/categories/men's clothing">
          <img src="/images/men.jpg" alt="" className={imageStyle} />
        </Link>
      </div>
      <div className={sliderStyle}>
        <Link to="/categories/women's clothing">
          <img src="/images/women.png" alt="" className={imageStyle} />
        </Link>
      </div>
      <div className={sliderStyle}>
        <Link to="/categories/electronics">
          <img src="/images/electronics.png" alt="" className={imageStyle} />
        </Link>
      </div>
    </Slider>
  );
}
