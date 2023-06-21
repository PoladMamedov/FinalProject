import React from "react";
import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.scss";
import styles from "./TopItemsSlider.scss";

const TopItemsSlider = () => {
  const items = [
    {
      id: 1,
      title: "Apple Watch 7X",
      image: "/img/top-slider/watch.jpeg",
      text: "Embrace the Future of Timekeeping with Apple Watch 7X: Unleash Your Style and Stay Connected in Style."
    },
    {
      id: 2,
      title: "Wireless Headphones Sony G",
      image: "/img/top-slider/headphone04.jpeg",
      text: "Experience Pure Audio Freedom with Sony G Wireless Headphones: Unleash the Sound."
    },
    {
      id: 3,
      title: "Gaming Keyboard Max",
      image: "/img/top-slider/keyboards-slider.jpeg",
      text: "Maximize Your Gaming Performance with Gaming Keyboard Max: Unleash Your Competitive Edge."
    },
    {
      id: 4,
      title: "Optical Mouse G305",
      image: "/img/top-slider/mice02.jpeg",
      text: "Elevate Your Precision with Optical Mouse G305: Unleash Your Gaming Potential."
    }
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 8000,
  };
  return (
      <Slider {...settings}>
        {items.map(( item ) => (
          <div
           className="topItems"
           key={item.id} >
            <div className="container">
            <h1 type="button" className="topItems_title">{item.title}</h1>
            <h3 className="topItems_caption">{item.text}</h3>
            <a href="/products" className={styles.topItems_link}>
              <button type="button" className="topItems_btn">Shop Now</button></a>
              </div>
            <img
            className="topItems_img"
            src={item.image}
            alt={item.text}
             />
          </div>
        ))}
      </Slider>
  );
};

export default TopItemsSlider;
