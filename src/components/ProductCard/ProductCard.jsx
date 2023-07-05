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
            <Link className={props.active ? "all-card__btn-details" : "card__btn-details"} to={`/details/${urlItemNumber}`}>DETAIL</Link>
            <button type={"button"} className={props.active ? "all-card__btn-cartContainer" : "card__btn-cartContainer"}>
              <img className={props.active ? "all-card__btn-svg-cart" : "card__btn-svg-cart"} src="/img/cart-logo.png" alt="cart-logo" />
            </button>
          </div>
        </div>
        <div className={props.active ? "all-card__block" : "unactive"} >
          <div className={"all-card__product-name"} >{props.item.name}</div>
          <div className={"all-card__product-price"} >{props.item.currentPrice}</div>
        </div>
      </div>

    </>
  );
}

