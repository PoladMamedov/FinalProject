import React from "react";
import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.scss";
import styles from "./TopItemsSlider.scss";

const TopItemsSlider = () => {
  const items = [
    {
      id: 1,
      title: "Apple Watch",
      image: "/img/top-slider/watch01.jpeg",
      text: "Stay Connected and Stylish with the",
      subtext: "Revolutionary Apple 7X Watch!"
    },
    {
      id: 2,
      title: "Headphone Sony",
      image: "/img/top-slider/headphone01.jpeg",
      text: "Immerse Yourself in Crystal Clear",
      subtext: "Sound with Sony G Headphones!"
    },
    {
      id: 3,
      title: "Gaming Keyboard",
      image: "/img/top-slider/keyboard01.jpeg",
      text: "Maximize Your Gaming Performance",
      subtext: "with Gaming Keyboard Max!"
    },
    {
      id: 4,
      title: "Optical Mouse",
      image: "/img/top-slider/mice01.jpeg",
      text: "Experience Precision and Speed with",
      subtext: " the G305 Optical Mouse!"
    }
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  return (
      <Slider {...settings}>
        {items.map(( item ) => (
          <div
           className="topItems"
           key={item.id} >
            <div className="container">
            <h1 type="button" className="topItems_title">{item.title}</h1>
            <h3 className="topItems_text">{item.text}</h3>
            <h3 className="topItems_subtext">{item.subtext}</h3>
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
