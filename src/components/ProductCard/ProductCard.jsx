import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecentlyProducts } from "../../redux/actions/recentlyProducts";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/actions/favorites";
import {increaseCart, increaseCartAsync} from "../../redux/actions/cart";
import FavoritesIcon from "../FavoritesIcon/FavoritesIcon";

export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);
  const { currency, currencyName } = useSelector(
    (state) => state.currentCurrency
  );
  // eslint-disable-next-line no-underscore-dangle
  const itemId = props.item._id;
  const userToken = useSelector((state) => state.user.userInfo.token);
  const currencyValue = parseFloat(currency);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
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
    console.log(onAddItemToCart);
    console.log(increaseCart);
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
                onClick={() => onAddItemToCart(itemId, userToken, props.item)}
                type={"button"}
                className={
                  props.active
                    ? "all-card__btn-card-container"
                    : "card__btn-card-container"
                }
              >
                <img
                  className={
                    props.active
                      ? "all-card__btn-svg-cart"
                      : "card__btn-svg-cart"
                  }
                  src="/img/cart-logo.png"
                  alt="cart-logo"
                />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block" : "unactive"}>
            <div className={"all-card__product-name"}>{props.item.name}</div>
            {props.item.previousPrice - props.item.currentPrice !== 0 ? (
              <div className="all-card__prices-wrap">
                <p className="all-card__price--prev">
                  <img
                    className="currency-icon"
                    src={`./img/currency/${currencyName}-icon.png`}
                    alt="cureency-icon"
                  />
                  {Math.floor(props.item.previousPrice * currencyValue)}
                </p>
                <p className="all-card__price--curr">
                  <img
                    className="currency-icon"
                    src={`./img/currency/${currencyName}-icon.png`}
                    alt="cureency-icon"
                  />
                  {Math.floor(props.item.currentPrice * currencyValue)}
                </p>
              </div>
            ) : (
              <div className={"all-card__price--curr"}>
                <img
                  className="currency-icon"
                  src={`./img/currency/${currencyName}-icon.png`}
                  alt="cureency-icon"
                />
                {Math.floor(props.item.currentPrice * currencyValue)}
              </div>
            )}
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
                type={"button"}
                className={
                  props.active
                    ? "all-card__btn-card-container--rows"
                    : "card__btn-card-container"
                }
              >
                <img
                  className={
                    props.active
                      ? "all-card__btn-svg-cart--rows"
                      : "card__btn-svg-cart"
                  }
                  src="/img/cart-logo.png"
                  alt="cart-logo"
                />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block--rows" : "unactive"}>
            <div className={"all-card__product-name--rows"}>
              {props.item.name}
            </div>
            {props.item.previousPrice - props.item.currentPrice !== 0 ? (
              <div className="all-card__prices-wrap--rows">
                <p className="all-card__price--prev">
                  <img
                    className="currency-icon--rows"
                    src={`/img/currency/${currencyName}-icon.png`}
                    alt="currency-icon"
                  />
                  {Math.floor(props.item.previousPrice * currencyValue)}
                </p>
                <p className="all-card__price--curr-rows">
                  <img
                    className="currency-icon--rows"
                    src={`/img/currency/${currencyName}-icon.png`}
                    alt="currency-icon"
                  />
                  {Math.floor(props.item.currentPrice * currencyValue)}
                </p>
              </div>
            ) : (
              <div className={"all-card__price--curr-rows"}>
                <img
                  className="currency-icon--rows"
                  src={`/img/currency/${currencyName}-icon.png`}
                  alt="currency-icon"
                />
                {Math.floor(props.item.currentPrice * currencyValue)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}