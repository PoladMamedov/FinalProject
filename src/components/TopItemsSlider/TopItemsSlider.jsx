import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./slick.scss";
import "./slick-theme.scss";
import { Link } from "react-router-dom";
import styles from "./TopItemsSlider.scss";
import useServer from "../../hooks/useServer";

const TopItemsSlider = () => {
  const [items, setItems] = useState([]);
  const { getSlides } = useServer();

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const products = await getSlides();
        setItems(products);
      } catch (err) {
      }
    };

    fetchSlider();
  }, [getSlides]);

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
      <div className="responsive-slider">
      <Slider {...settings}>
        {items.map((item) => (
          <div className="topItems" key={item.id}>
            <div className="container">
              <h1 type="button" className="topItems_title">{item.title}</h1>
              <h3 className="topItems_text">{item.text}</h3>
              <h3 className="topItems_subtext">{item.subtext}</h3>
              <Link to={`/products/${item.customId}`} className={styles.topItems_link}>
                <button type="button" className="topItems_btn">Shop Now</button>
              </Link>
            </div>
            <img className="topItems_img" src={item.imageUrl} alt={item.text} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopItemsSlider;
