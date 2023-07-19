import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyProducts } from "../../redux/actions/recentlyProducts";
import { increaseCart, increaseCartAsync } from "../../redux/actions/cart";

export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);
  const { currency, currencyName } = useSelector((state) => state.currentCurrency);
  const currencyValue = parseFloat(currency);
  // eslint-disable-next-line no-underscore-dangle
  const itemId = props.item._id;
  const userToken = useSelector((state) => state.user.userInfo.token);

  const dispatch = useDispatch();
  const onAddItemToCart = async (item, token, productInfo) => {
    try {
      if (token) {
        dispatch(increaseCartAsync(item, token, productInfo));
      } else {
        dispatch(increaseCart(item, productInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                onClick={() => onAddItemToCart(itemId, userToken, props.item)}
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
              <p className="all-card__price--prev">
                <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr">
                <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.currentPrice * currencyValue)}</p>
            </div> : <div className={"all-card__price--curr"}>
              <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
              {Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>
        : <div className={props.active ? "all-card-container__rows" : "card-container"}>
          <div className={props.active ? "all-card__rows" : "card"} style={{ backgroundImage: `url(${urlImg})` }}>
            <div className={props.active ? "all-card__btn--rows" : "card__btn"}>
              <Link
                className={props.active ? "all-card__btn-details--rows" : "card__btn-details"}
                to={`/products/${urlItemNumber}`}
                onClick={() => dispatch(getRecentlyProducts(urlItemNumber))}>DETAIL</Link>
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
              <p className="all-card__price--prev">
                <img className="currency-icon--rows" src={`/img/currency/${currencyName}-icon.png`} alt="currency-icon" />
                {Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr-rows">
                <img className="currency-icon--rows" src={`/img/currency/${currencyName}-icon.png`} alt="currency-icon" />
                {Math.floor(props.item.currentPrice * currencyValue)}</p>

            </div> : <div className={"all-card__price--curr-rows"}>
              <img className="currency-icon--rows" src={`/img/currency/${currencyName}-icon.png`} alt="currency-icon" />
              {Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>}
    </>
  );
}

