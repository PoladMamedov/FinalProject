import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import cloudinaryConfig from "../../config/cloudinaryConfig";
import { getRecentlyProducts } from "../../redux/actions/recentlyProducts";
import {
  addToFavorites,
  removeFromFavorites,
  incrementFavoritesCount,
  decrementFavoritesCount,
} from "../../redux/actions/favorites";


export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);
  const { currency, currencyName } = useSelector((state) => state.currentCurrency);
  const currencyValue = parseFloat(currency);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
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
                  <Image
                    cloudName={cloudinaryConfig.cloudName}
                    className={
                      isFavorited
                        ? "all-card__like-btn active"
                        : "all-card__like-img"
                    }
                    publicId={isFavorited ? "like_icon2_c3behn" : "heart_icon2_ecsngk"}
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
                type={"button"}
                className={props.active ? "all-card__btn-card-container" : "card__btn-card-container"}>
                <Image
                  cloudName={cloudinaryConfig.cloudName}
                  className={props.active ? "all-card__btn-svg-cart" : "card__btn-svg-cart"}
                  publicId="cart-logo_tz7wza"
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
        : <div className={props.active ? "all-card-container__rows" : "card-container"}>
          <div className={props.active ? "all-card__rows" : "card"} style={{ backgroundImage: `url(${urlImg})` }}>
            <div className={props.active ? "all-card__btn--rows" : "card__btn"}>
              <div className="all-card__likes-top">
                <button type="button" className="all-card__likes-top-button">
                  <Image
                    cloudName={cloudinaryConfig.cloudName}
                    className={
                      isFavorited
                        ? "all-card__likes-top-btn active"
                        : "all-card__likes-top-img"
                    }
                    publicId={isFavorited ? "like_icon2_c3behn" : "heart_icon2_ecsngk"}
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
                <Image
                  cloudName={cloudinaryConfig.cloudName}
                  className={props.active ? "all-card__btn-svg-cart--rows" : "card__btn-svg-cart"}
                  publicId="cart-logo_tz7wza"
                  alt="cart-logo" />
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
        </div>}
    </>
  );
}
