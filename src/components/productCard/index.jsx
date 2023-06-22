import  "./productCard.scss"
import React from "react";

export default function ProductCard() {
  const imageUrl = "https://content2.rozetka.com.ua/goods/images/big/263857437.jpg";
  return (
    <>
      <div className={"cardContainer"}>
        <div className={"card"} style={{backgroundImage: `url(${imageUrl})`}} >
          <div className={"card__btn"}>
          <div className={"card__btn-details"} >DETAILS</div>
          <div className={"card__btn-cartContainer"}>
            <img className={"card__btn-svgCart"} src="/img/cart-logo.png" alt="cart-logo" />
          </div>
          </div>
        </div>
      </div>

    </>
  );
}

