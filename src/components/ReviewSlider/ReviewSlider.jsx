import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Navigation, Pagination, Scrollbar, A11y
} from "swiper";
// eslint-disable-next-line import/no-extraneous-dependencies
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";

function ReviewSlider({ slides }) {
  return (
    <section className="slider__wrapper">
      <div className="slider-section__section">
        <div className="slider-section__title">
          <h1>Help us Improve our productivity</h1>
        </div>
        <Swiper
          className="slider-section__center"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          // eslint-disable-next-line react/jsx-props-no-multi-spaces, react/jsx-boolean-value
          loop={true}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {slides.map((slide) => (
            <SwiperSlide className="article" key={slide.image}>
              <img className="slider-section__img" src={slide.image} alt="" />
              <h4 className="slider-section__name">{slide.name}</h4>
              <p className="slider-section__client">{slide.title}</p>
              <p className="slider-section__text">{slide.text}</p>
            </SwiperSlide>
          ))}
          <RxDoubleArrowLeft className="swiper-button-prev prev" />
          <RxDoubleArrowRight className="swiper-button-next next" />
        </Swiper>
      </div>
    </section>
  );
}

export default ReviewSlider;
