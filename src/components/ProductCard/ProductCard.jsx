import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);

  return (
    <>
      <div className={props.active ? "all-card-container" : "card-container"}>
        <div className={props.active ? "all-card" : "card"} style={{backgroundImage: `url(${urlImg})`}} >
          <div className={props.active ? "all-card__btn" : "card__btn"}>
          <div className="all-card__like">
            <img className={props.active ? "all-card__like-btn" : "all-card__like-img"} src="/img/unlike_icon3.png" alt="unlike-icon" />
            </div>
            <Link className={props.active ? "all-card__btn-details" : "card__btn-details"} to={`/products/${urlItemNumber}`}>DETAIL</Link>
            <button type={"button"} className={props.active ? "all-card__btn-card-container" : "card__btn-card-container"}>
              <img className={props.active ? "all-card__btn-svg-cart" : "card__btn-svg-cart"} src="/img/cart-logo.png" alt="cart-logo" />
            </button>
          </div>
        </div>
        <div className={props.active ? "all-card__block" : "unactive"} >
          <div className={"all-card__product-name"} >{props.item.name}</div>
          {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap">
            <p className="all-card__price--prev">${props.item.previousPrice}</p>
            <p className="all-card__price--curr">${props.item.currentPrice}</p>
          </div> : <div className={"all-card__price--curr"}>${props.item.currentPrice}</div>}
        </div>
      </div>

    </>
  );
}

