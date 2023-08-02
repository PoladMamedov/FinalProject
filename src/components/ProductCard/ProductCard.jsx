/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from "react";
import { Store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRecentlyProducts } from "../../redux/actions/recentlyProducts";
import { addCompareProducts, removeCompareProducts } from "../../redux/actions/compareProducts";
import notificationsSettings from "../../constants/constants";
import {
  increaseFav, increaseFavAsync,
  removeFromFavorites, removeFromFavAsync
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
  const itemId = props.item._id;
  const userToken = useSelector((state) => state.user.userInfo.token);
  const currencyValue = parseFloat(currency);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { compareProducts } = useSelector((state) => state.compareProducts);
  // console.log(compareProducts);

  function addProducttoCompare() {
    console.log(addProducttoCompare);
    if (!compareProducts.includes(urlItemNumber)) {
      dispatch(addCompareProducts(urlItemNumber));
    } else {
      dispatch(removeCompareProducts(urlItemNumber));
    }
    compareBtn.current.classList.toggle("compare-btn--clicked");
  }

  // const favorites = useSelector((state) => state.favorites.favorites);
  const { favorites } = useSelector((state) => state.favorites);
  console.log("favs", favorites);
  const [isFavorited, setIsFav] = useState(false);

  // useEffect(() => {
  //   setIsFav(favorites.find((item) => item.itemNo === urlItemNumber));
  // }, [favorites]);

  const handleAddToFavorites = async (item, token, productInfo) => {
    // const newItem = {
    //   imageUrls: [props.item.imageUrls[0]],
    //   name: props.item.name,
    //   currentPrice: props.item.currentPrice,
    //   itemNo: props.item.itemNo,
    // };
    console.warn("itemid", item, 'Token', token, 'productinfo', productInfo);

    try {
      if (favorites.some((fav) => fav.product._id === productInfo._id)) {
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.errorReAddToCart });
      } else {
        if (token) {
          dispatch(increaseFavAsync(item, token, productInfo));
          // console.log(increaseFavAsync(item, token, productInfo));
        } else {
          dispatch(increaseFav(item, productInfo));
          // console.log(increaseFav(item, productInfo));
        }
      }
      setIsFav(true);
    } catch (error) {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.error, message: error.message });
    }
  };

  const handleRemoveFromFavorites = async (item, token, productInfo) => {
    console.log(handleRemoveFromFavorites);
    if (favorites.some((favItem) => favItem.product._id === productInfo._id)) {
      setIsFav(false);
    } else {
      if (token) {
        dispatch(removeFromFavAsync(item, token, productInfo));
        console.log(removeFromFavAsync(item, token, productInfo));
      } else {
        dispatch(removeFromFavorites(item, productInfo));
        console.log(removeFromFavorites(item, productInfo));
      }
    }
  };

    // const handleAddToFavorites = async () => {
  //   const newItem = {
  //     imageUrls: [props.item.imageUrls[0]],
  //     name: props.item.name,
  //     currentPrice: props.item.currentPrice,
  //     quantity: props.item.quantity,
  //     itemNo: props.item.itemNo,
  //   };
  //   dispatch(addToFavorites(newItem));
  //   setIsFav(true);
  // };

  // const handleRemoveFromFavorites = () => {
  //   setIsFav(false);
  //   dispatch(removeFromFavorites(urlItemNumber));
  // };

  const { cart } = useSelector((state) => state.cart);
  console.log('cart', cart);

  const onAddItemToCart = async (item, token, productInfo) => {
    console.log(onAddItemToCart);
    try {
      if (cart.some((cartItem) => cartItem.product._id === productInfo._id)) {
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.errorReAddToCart });
      } else {
        if (token) {
          dispatch(increaseCartAsync(item, token, productInfo));
        } else {
          dispatch(increaseCart(item, productInfo));
        }
      }
    } catch (error) {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.error, message: error.message });
    }
    cartBtn.current.classList.add("compare-btn--clicked");
  };

  const handleCardClick = (event) => {
    // Проверяем, было ли нажатие на кнопку сравнения или избранного
    if (!event.target.closest(".compare-btn") && !event.target.closest(".all-card__like-button") && !event.target.closest(".all-card__likes-top-button")) {
      navigate(`/products/${urlItemNumber}`);
      dispatch(getRecentlyProducts(urlItemNumber));
    }
  };

  return (
    <>
      {props.isCardView ? (
        <div
          className={props.active ? "all-card-container" : "card-container"}
          onClick={handleCardClick}>
          <div
            className={props.active ? "all-card" : "card"}
            style={{ backgroundImage: `url(${urlImg})` }}
          >
            <div className={props.active ? "all-card__btn" : "card__btn"}>
              <div className="all-card__like">
                <button type="button" onClick={() => handleAddToFavorites(itemId, userToken, props.item)} className="all-card__like-button">
                  <FavoritesIcon
                    className={
                      isFavorited
                        ? "all-card__like-btn active"
                        : "all-card__like-img"
                    }
                    color="#535353"
                    isFill={isFavorited}
                    // clickHandler={
                    //   isFavorited
                    //     ? handleRemoveFromFavorites
                    //     : handleAddToFavorites
                    // }
                  />
                </button>
              </div>
              <button
                ref={compareBtn}
                onClick={() => addProducttoCompare()}
                type={"button"}
                className={`compare-btn ${compareProducts.includes(urlItemNumber) ? "compare-btn--clicked" : ""}`}
              >
                <img
                  className="all-card__like-img"
                  src={!compareProducts.includes(urlItemNumber) ? "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040128/scales2_a3fxya.svg" : "https://res.cloudinary.com/dfinki0p4/image/upload/v1690040128/scales1_klxlre.svg"}
                  alt="compare-logo" />
              </button>
              <button
                ref={cartBtn}
                onClick={() => onAddItemToCart(itemId, userToken, props.item)}
                type={"button"}
                className={cart.some((cartItem) => cartItem.product._id === props.item._id) ? "all-card__like-button compare-btn--clicked" : "all-card__like-button"}
              >
                <img
                  className="all-card__like-img"
                  style={{ marginTop: 0 }}
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
          onClick={handleCardClick}
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
              <button
                ref={cartBtn}
                onClick={() => onAddItemToCart(itemId, userToken, props.item)}
                type={"button"}
                className={cart.some((cartItem) => cartItem.product._id === props.item._id) ? "all-card__likes-top-button compare-btn--clicked" : "all-card__likes-top-button"}
              >
                <img
                  className="all-card__likes-top-img"
                  style={{ marginTop: 0 }}
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