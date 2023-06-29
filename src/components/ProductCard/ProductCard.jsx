import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);

  return (
    <>
      <div className={props.active ? "allCardContainer" : "cardContainer"}>
        <div className={props.active ? "allCard" : "card"} style={{backgroundImage: `url(${urlImg})`}} >
          <div className={props.active ? "allCard__btn" : "card__btn"}>
            <Link className={props.active ? "allCard__btn-details" : "card__btn-details"} to={`/details/${urlItemNumber}`}>DETAIL</Link>
            <button type={"button"} className={props.active ? "allCard__btn-cartContainer" : "card__btn-cartContainer"}>
              <img className={props.active ? "allCard__btn-svgCart" : "card__btn-svgCart"} src="/img/cart-logo.png" alt="cart-logo" />
            </button>
          </div>
        </div>
        <div className={props.active ? "allCard__block" : "unactive"} >
          <div className={"allCard__productName"} >{props.item.name}</div>
          <div className={"allCard__productPrice"} >{props.item.currentPrice}</div>
        </div>
      </div>

    </>
  );
}

