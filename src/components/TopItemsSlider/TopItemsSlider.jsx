import React from "react";
import Slider from "react-slick";
import "./slick.scss";
import "slick-carousel/slick/slick-theme.css";
import styler from "./TopItemsSlider.module.scss";

const TopItemsSlider = () => {
  const items = [
    { id: 1, title: "Apple Watch", image: "/img/watch.jpeg" },
    { id: 2, title: "Headphone Sony", image: "/img/headphone-slider.jpeg" },
    { id: 3, title: "Keyboard", image: "/img/keyboards-slider.jpeg" },
    { id: 4, title: "Mice", image: "/img/mice-slider.jpeg" },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
      <Slider {...settings}>
        {items.map((item) => (
          <div className="top_items" key={item.id}>
            <a href="/products">
            <h3>{item.title}</h3>
            <img className="topImg" src={item.image} alt={item.title} />
            </a>
          </div>
        ))}
      </Slider>
  );
};

export default TopItemsSlider;
