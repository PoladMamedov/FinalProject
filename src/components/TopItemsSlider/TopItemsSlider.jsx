import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
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
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true
  };

  return (
    <section className="top-items__slider">
      <Slider {...settings}>
      {items.map((item, index) => (
          <div className="top-items" key={index}>
            <div className="container">
              <h1 type="button" className="top-items__title">{item.title}</h1>
              <h3 className="top-items__text">{item.text}</h3>
              <h3 className="top-items__subtext">{item.subtext}</h3>
              <Link to={`/products/${item.itemNo}`} className="top-items__link">
                <button type="button" className="top-items__btn">Shop Now</button>
              </Link>
            </div>
            <img className="top-items__img" src={item.imageUrl} alt={item.text} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TopItemsSlider;
