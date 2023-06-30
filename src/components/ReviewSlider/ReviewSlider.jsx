import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
import data from "./data";

const ReviewSlider = () => {
  const [people] = useState(data);
  console.log(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="slider__wrapper">
      <div className="slider-section__section">
        <div className="slider-section__title">
          <h1>Help us Improve our productivity</h1>
        </div>
        <div className="slider-section__center">
          {people.map((item, indexPeople) => {
            const {
              id, image, name, title, text
            } = item;
            let position = "nextSlide";
            if (indexPeople === index) {
              position = "activeSlide";
            }
            if (
              indexPeople === index - 1
              || (index === 0 && indexPeople === people.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className="slider-section__img" />
                <h4 className="slider-section__name">{name}</h4>
                <p className="slider-section__client">{title}</p>
                <p className="slider-section__text">{text}</p>
              </article>
            );
          })}
          <RxDoubleArrowLeft
            className="prev"
            onClick={() => setIndex(index - 1)}
          />
          <RxDoubleArrowRight
            className="next"
            onClick={() => setIndex(index - 1)}
          />
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
