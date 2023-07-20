/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from "react";
import { Store } from "react-notifications-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyProducts } from "../../redux/actions/recentlyProducts";
import { addCompareProducts } from "../../redux/actions/compareProducts";
import notificationsSettings from "../../constants/constants";
import {
  addToFavorites,
  removeFromFavorites,
  incrementFavoritesCount,
  decrementFavoritesCount,
} from "../../redux/actions/favorites";
import unlikeIcon from "../../pages/Favorites/heart_icon2.png";
import likeIcon from "../../pages/Favorites/like_icon2.png";


export default function ProductCard(props) {
  const scales = useRef();
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);
  const { currency, currencyName } = useSelector((state) => state.currentCurrency);
  const currencyValue = parseFloat(currency);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const { compareProducts } = useSelector((state) => state.compareProducts);

  function addProducttoCompare() {
    if (!compareProducts.includes(urlItemNumber)) {
      dispatch(addCompareProducts(urlItemNumber));
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.addedToCompare });
    } else {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.errorCompare });
    }
  }
  const [isFavorited, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(favorites.find((item) => item.itemNo === urlItemNumber));
  }, []);

  const handleAddToFavorites = async () => {
    const nameWithoutLastWord = props.item.name.slice(
      0,
      props.item.name.lastIndexOf(" ")
    );
    const newItem = {
      imageUrls: [props.item.imageUrls[0]],
      name: nameWithoutLastWord,
      currentPrice: props.item.currentPrice,
      quantity: props.item.quantity,
      itemNo: props.item.itemNo,
    };
    dispatch(addToFavorites(newItem));
    dispatch(incrementFavoritesCount());
    setIsFav(true);
  };

  const handleRemoveFromFavorites = () => {
    setIsFav(false);
    dispatch(removeFromFavorites(urlItemNumber));
    dispatch(decrementFavoritesCount());
  };


  return (
    <>
      {props.isCardView
        ? <div className={props.active ? "all-card-container" : "card-container"}>
          <div className={props.active ? "all-card" : "card"} style={{ backgroundImage: `url(${urlImg})` }}>
            <div className={props.active ? "all-card__btn" : "card__btn"}>
              <div className="all-card__like">
                <button type="button" className="all-card__like-button">
                  <img
                    className={
                      isFavorited
                        ? "all-card__like-btn active"
                        : "all-card__like-img"
                    }
                    src={isFavorited ? likeIcon : unlikeIcon}
                    alt="like-icon"
                    onClick={
                      isFavorited
                        ? handleRemoveFromFavorites
                        : handleAddToFavorites
                    }
                  />
                </button>
              </div>
              <Link
                className={props.active ? "all-card__btn-details" : "card__btn-details"}
                to={`/products/${urlItemNumber}`}>DETAIL</Link>
                <button
                onClick={() => addProducttoCompare()}
                type={"button"}
                className={"compare-btn"}
                >
                <img
                ref={scales}
                className="compare-btn-icon"
                  src="/img/header/scales2.svg"
                  alt="compare-logo" />
              </button>
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
              <div className="all-card__likes-top">
                <button type="button" className="all-card__likes-top-button">
                  <img
                    className={
                      isFavorited
                        ? "all-card__likes-top-btn active"
                        : "all-card__likes-top-img"
                    }
                    src={isFavorited ? likeIcon : unlikeIcon}
                    alt="like-icon"
                    onClick={
                      isFavorited
                        ? handleRemoveFromFavorites
                        : handleAddToFavorites
                    }
                  />
                </button>
              </div>
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
