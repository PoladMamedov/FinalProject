import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);
  const { currency } = useSelector((state) => state.currentCurrency);
  const currencyValue = parseFloat(currency);
  console.log(typeof props.currentPrice);
  return (
    <>
      {props.isCardView
        ? <div className={props.active ? "all-card-container" : "card-container"}>
          <div className={props.active ? "all-card" : "card"} style={{ backgroundImage: `url(${urlImg})` }}>
            <div className={props.active ? "all-card__btn" : "card__btn"}>
              <Link
                className={props.active ? "all-card__btn-details" : "card__btn-details"}
                to={`/products/${urlItemNumber}`}>DETAIL</Link>
              <button
                type={"button"}
                className={props.active ? "all-card__btn-card-container" : "card__btn-card-container"}>
                <img
                  className={props.active ? "all-card__btn-svg-cart" : "card__btn-svg-cart"}
                  src="/img/cart-logo.png"
                  alt="cart-logo" />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block" : "unactive"}>
            <div className={"all-card__product-name"}>{props.item.name}</div>
            {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap">
              <p className="all-card__price--prev">{Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr">{Math.floor(props.item.currentPrice * currencyValue)}</p>
            </div> : <div className={"all-card__price--curr"}>{Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>
        : <div className={props.active ? "all-card-container__rows" : "card-container"}>
          <div className={props.active ? "all-card__rows" : "card"} style={{ backgroundImage: `url(${urlImg})` }}>
            <div className={props.active ? "all-card__btn--rows" : "card__btn"}>
              <Link
                className={props.active ? "all-card__btn-details--rows" : "card__btn-details"}
                to={`/products/${urlItemNumber}`}>DETAIL</Link>
              <button
                type={"button"}
                className={props.active ? "all-card__btn-card-container--rows" : "card__btn-card-container"}>
                <img
                  className={props.active ? "all-card__btn-svg-cart--rows" : "card__btn-svg-cart"}
                  src="/img/cart-logo.png"
                  alt="cart-logo" />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block--rows" : "unactive"}>
            <div className={"all-card__product-name--rows"}>{props.item.name}</div>
            {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap--rows">
              <p className="all-card__price--prev">{Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr-rows">{Math.floor(props.item.currentPrice * currencyValue)}</p>

            </div> : <div className={"all-card__price--curr-rows"}>{Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>}
    </>
  );
}

