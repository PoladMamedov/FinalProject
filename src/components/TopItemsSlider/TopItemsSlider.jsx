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
      image: "/img/top-slider/watch.jpeg",
      text: "Stay Connected in Style"
    },
    {
      id: 2,
      title: "Wireless Headphones",
      image: "/img/top-slider/headphone-slider.jpeg",
      text: "Immerse Yourself in Music"
    },
    {
      id: 3,
      title: "Gaming Keyboard",
      image: "/img/top-slider/keyboards-slider.jpeg",
      text: "Unleash Your Gaming Potential"
    },
    {
      id: 4,
      title: "Optical Mouse",
      image: "/img/top-slider/mice-slider.jpeg",
      text: "Precision at Your Fingertips"
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
           className={styles.topItems}
           key={item.id} >
            <h1 type="button" className={styles.topItems_title}>{item.title}</h1>
            <h3 className={styles.topItems_caption}>{item.text}</h3>
            <a href="/products" className={styles.topItems_link}>
              <button type="button" className={styles.topItems_btn}>Shop Now</button></a>
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
