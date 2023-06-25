import  "./productCard.scss";
import React, { useState } from "react";

export default function ProductCard(props) {
  const [url] = useState(props.item.imageUrls[0]);
  const imageUrl = url;
  return (
    <>
      <div className={"cardContainer"}>
        <div className={"card"} style={{backgroundImage: `url(${imageUrl})`}} >
          <div className={"card__btn"}>
          <div className={"card__btn-details"} >DETAIL</div>
          <div className={"card__btn-cartContainer"}>
            <img className={"card__btn-svgCart"} src="/img/cart-logo.png" alt="cart-logo" />
          </div>
          </div>
        </div>
      </div>

    </>
  );
}

