/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from "react";
import { Store } from "react-notifications-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyProducts } from "../../redux/actions/recentlyProducts";
import { addCompareProducts, removeCompareProducts } from "../../redux/actions/compareProducts";
import notificationsSettings from "../../constants/constants";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/actions/favorites";
import { increaseCart, increaseCartAsync } from "../../redux/actions/cart";
import FavoritesIcon from "../FavoritesIcon/FavoritesIcon";

export default function ProductCard(props) {
  const compareBtn = useRef();
  const cartBtn = useRef();
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);
  const { currency, currencyName } = useSelector(
    (state) => state.currentCurrency
  );
  // eslint-disable-next-line no-underscore-dangle
  const itemId = props.item._id;
  const userToken = useSelector((state) => state.user.userInfo.token)
  const currencyValue = parseFloat(currency);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const { compareProducts } = useSelector((state) => state.compareProducts);

  function addProducttoCompare() {
    if (!compareProducts.includes(urlItemNumber)) {
      dispatch(addCompareProducts(urlItemNumber));
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.addedToCompare });
    } else {
      dispatch(removeCompareProducts(urlItemNumber));
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.errorCompare });
    }
    compareBtn.current.classList.toggle("compare-btn--clicked");
  }
  const [isFavorited, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(favorites.find((item) => item.itemNo === urlItemNumber));
  }, []);

  const handleAddToFavorites = async () => {
    const newItem = {
      imageUrls: [props.item.imageUrls[0]],
      name: props.item.name,
      currentPrice: props.item.currentPrice,
      quantity: props.item.quantity,
      itemNo: props.item.itemNo,
    };
    dispatch(addToFavorites(newItem));
    setIsFav(true);
  };

  const { cart } = useSelector((state) => state.cart);

  const onAddItemToCart = async (item, token, productInfo) => {
    try {
      if (cart.some((cartItem) => cartItem.product._id === productInfo._id)) {
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.errorReAddToCart });
      } else {
        if (token) {
          dispatch(increaseCartAsync(item, token, productInfo));
          Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.addedToCart });
        } else {
          dispatch(increaseCart(item, productInfo));
          Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.addedToCart });
        }
      }
    } catch (error) {
      console.log(error);
    }
    cartBtn.current.classList.add("compare-btn--clicked");
  };

  const handleRemoveFromFavorites = () => {
    setIsFav(false);
    dispatch(removeFromFavorites(urlItemNumber));
  };

  return (
    <>
      {props.isCardView ? (
        <div className={props.active ? "all-card-container" : "card-container"}>
          <div
            className={props.active ? "all-card" : "card"}
            style={{ backgroundImage: `url(${urlImg})` }}
          >
            <div className={props.active ? "all-card__btn" : "card__btn"}>
              <div className="all-card__like">
                <button type="button" className="all-card__like-button">
                  <FavoritesIcon
                    className={
                      isFavorited
                        ? "all-card__like-btn active"
                        : "all-card__like-img"
                    }
                    color="#535353"
                    isFill={isFavorited}
                    clickHandler={
                      isFavorited
                        ? handleRemoveFromFavorites
                        : handleAddToFavorites
                    }
                  />
                </button>
              </div>
              <Link
                className={
                  props.active ? "all-card__btn-details" : "card__btn-details"
                }
                to={`/products/${urlItemNumber}`}
              >
                DETAIL
              </Link>
              <button
                ref={compareBtn}
                onClick={() => addProducttoCompare()}
                type={"button"}
                className={`compare-btn ${compareProducts.includes(urlItemNumber) ? "compare-btn--clicked" : ""}`}
              >
                <img
                  className="compare-btn-icon"
                  src={!compareProducts.includes(urlItemNumber) ? "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040128/scales2_a3fxya.svg" : "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040128/scales1_klxlre.svg"}
                  alt="compare-logo" />
              </button>
              <button
                ref={cartBtn}
                onClick={() => onAddItemToCart(itemId, userToken, props.item)}
                type={"button"}
                className={cart.some((cartItem) => cartItem.product._id === props.item._id) ? "all-card__like-button compare-btn--clicked" : "all-card__like-button"}
              // className={
              //   props.active
              //     ? "all-card__btn-card-container"
              //     : "card__btn-card-container"
              // }
              >
                <img
                  className="all-card__like-img"
                  style={{ marginTop: 0 }}
                  // className={
                  //   props.active
                  //     ? "all-card__btn-svg-cart"
                  //     : "card__btn-svg-cart"
                  // }
                  src={cart.some((cartItem) => cartItem.product._id === props.item._id) ? "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040581/cart1_f0ynp2.svg" : "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040581/cart_ktpd3c.svg"}
                  alt="cart-logo"
                />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block" : "unactive"}>
            <div className={"all-card__product-name"}>{props.item.name}</div>
            {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap">
              <p className="all-card__price--prev">
                <img className="currency-icon" src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr">
                <img className="currency-icon" src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.currentPrice * currencyValue)}</p>
            </div> : <div className={"all-card__price--curr"}>
              <img className="currency-icon" src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`} alt="cureency-icon" />
              {Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>
      ) : (
        <div
          className={
            props.active ? "all-card-container__rows" : "card-container"
          }
        >
          <div
            className={props.active ? "all-card__rows" : "card"}
            style={{ backgroundImage: `url(${urlImg})` }}
          >
            <div className={props.active ? "all-card__btn--rows" : "card__btn"}>
              <div className="all-card__likes-top">
                <button type="button" className="all-card__likes-top-button">
                  <FavoritesIcon
                    className={
                      isFavorited
                        ? "all-card__likes-top-btn active"
                        : "all-card__likes-top-img"
                    }
                    color="#535353"
                    isFill={isFavorited}
                    clickHandler={
                      isFavorited
                        ? handleRemoveFromFavorites
                        : handleAddToFavorites
                    }
                  />
                </button>
              </div>
              <Link
                className={
                  props.active
                    ? "all-card__btn-details--rows"
                    : "card__btn-details"
                }
                to={`/products/${urlItemNumber}`}
                onClick={() => dispatch(getRecentlyProducts(urlItemNumber))}
              >
                DETAIL
              </Link>
              <button
                ref={cartBtn}
                onClick={() => onAddItemToCart(itemId, userToken, props.item)}
                type={"button"}
                className={cart.some((cartItem) => cartItem.product._id === props.item._id) ? "all-card__likes-top-button compare-btn--clicked" : "all-card__likes-top-button"}
              // className={
              //   props.active
              //     ? "all-card__btn-card-container--rows"
              //     : "card__btn-card-container"
              // }
              >
                <img
                  className="all-card__likes-top-img"
                  style={{ marginTop: 0 }}
                  // className={
                  //   props.active
                  //     ? "all-card__btn-svg-cart--rows"
                  //     : "card__btn-svg-cart"
                  // }
                  // src="/img/cart-logo.png"
                  src={cart.some((cartItem) => cartItem.product._id === props.item._id) ? "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040581/cart1_f0ynp2.svg" : "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040581/cart_ktpd3c.svg"}
                  alt="cart-logo"
                />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block--rows" : "unactive"}>
            <div className={"all-card__product-name--rows"}>{props.item.name}</div>
            {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap--rows">
              <p className="all-card__price--prev">
                <img className="currency-icon--rows" src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`} alt="currency-icon" />
                {Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr-rows">
                <img className="currency-icon--rows" src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`} alt="currency-icon" />
                {Math.floor(props.item.currentPrice * currencyValue)}</p>

            </div> : <div className={"all-card__price--curr-rows"}>
              <img className="currency-icon--rows" src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`} alt="currency-icon" />
              {Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>
      )}
    </>
  );
}