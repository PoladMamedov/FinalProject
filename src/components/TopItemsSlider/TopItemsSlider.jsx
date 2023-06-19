import React from "react";
import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.scss";
import styles from "./TopItemsSlider.scss";

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
    autoplaySpeed: 8000,
  };
  return (
      <Slider {...settings}>
        {items.map(( item ) => (
          <div
           className={styles.top_items}
           key={item.id} >
            <a href="/products" className="topItems_link">
            <h3 className="topItems_caption">{item.title}</h3>
            <img 
            className="topItems_img"
            src={item.image} 
            alt={item.title}
             />
            </a>
          </div>
        ))}
      </Slider>
  );
};

export default TopItemsSlider;
