import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/scss/notification.scss";
import "animate.css/animate.min.css";
import FavoritesIcon from "../../../components/FavoritesIcon/FavoritesIcon";
import {
  increaseFav,
  increaseFavAsync,
  removeFromFavorites,
  removeFromFavAsync,
} from "../../../redux/actions/favorites";
import OrderQuantity from "./OrderQuantity";
import { fetchCart, setCart, fillCart } from "../../../redux/actions/cart";
import notificationsSettings from "../../../constants/constants";
import CurrencyIcon from "../../../components/CurrencyIcon/CurrencyIcon";

export default function OrderActions(props) {
  const {
    properties: { color },
    quantity,
    previousPrice,
    currentPrice,
    similarProducts,
    itemNo,
    _id: productID,
  } = props;

  console.log("+++++++", quantity, itemNo, currentPrice, productID);
  const dispatch = useDispatch();
  console.log("PROPS INSIDE = PRODUCT INFO", props);
  console.log("productID = ITEM", productID);
  console.log("props.productID = ITEM", props.itemNo);
  // console.log("PRODUCT INFO +++++++", productInfo);

  const {
    userInfo: { token },
  } = useSelector((state) => state.user);
  console.log("TOKEN", token);
  console.log("USER INFO", props.userInfo);
  const { cart } = useSelector((state) => state.cart);
  const { currency, currencyName } = useSelector(
    (state) => state.currentCurrency
  );
  // const favorites = useSelector((state) => state.favorites.favorites);
  const { favorites } = useSelector((state) => state.favorites);
    console.log("favs", favorites);
  const currencyValue = parseFloat(currency);

  const [productColor, setProductColor] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const colors = { ...similarProducts, [itemNo]: color };
  const price = { currentPrice, previousPrice };

  const isItemFavorited = () => {
    return favorites.some((fav) => fav.product._id === productID);
  };

  // eslint-disable-next-line no-shadow
  const handleAddToFavorites = async (productID, token) => {
    try {
      if (token) {
        dispatch(increaseFavAsync(productID, token));
        // console.log("PRODUCT INFO >>>>>>", productInfo);
      } else {
        dispatch(increaseFav(productID));
      }
    } catch (error) {
      Store.addNotification({
        ...notificationsSettings.basic,
        ...notificationsSettings.error,
        message: error.message,
      });
    }
  };
  console.log(itemNo);
  // eslint-disable-next-line no-shadow
  const handleRemoveFromFavorites = async (productID, token) => {
    try {
      if (token) {
        dispatch(removeFromFavAsync(productID, token));
      } else {
        dispatch(removeFromFavorites(productID));
      }
    } catch (error) {
      Store.addNotification({
        ...notificationsSettings.basic,
        ...notificationsSettings.error,
        message: error.message,
      });
    }
  };
  // eslint-disable-next-line no-shadow
  const handleToggleFavorites = async (productID, token) => {
    try {
      if (isItemFavorited(productID)) {
        await handleRemoveFromFavorites(productID, token);
      } else {
        await handleAddToFavorites(productID, token);
      }
    } catch (error) {}
  };
  const handleClick = () => {
    handleToggleFavorites(productID, token);
    console.log(handleToggleFavorites(productID, token));
  };

  useEffect(() => {
    setProductColor(color);
    setIsFav(favorites.find((item) => item.itemNo === itemNo));
  }, []);

  useEffect(() => {
    const productInCart = cart.find(
      ({ product: { _id: id } }) => id === productID
    );
    if (productInCart && productInCart.cartQuantity === quantity) setOutOfStock(true);
  }, [cart]);

  async function onAddButtonClick() {
    try {
      if (token) dispatch(fetchCart(token));
      const productInCart = cart.find(
        ({ product: { _id: id } }) => id === productID
      );

      const updatedCart = productInCart
        ? {
            products: cart.map((el) => {
              if (el.product._id === productID) return { ...el, cartQuantity: el.cartQuantity + orderQuantity };
              return { ...el };
            }),
          }
        : {
            products: [
              ...cart,
              {
                product: { ...props },
                cartQuantity: orderQuantity,
              },
            ],
          };

      if (token) {
        dispatch(setCart(updatedCart, token));
      } else {
        dispatch(fillCart(updatedCart.products));
      }

      setOrderQuantity(1);

      Store.addNotification({
        ...notificationsSettings.basic,
        ...notificationsSettings.addedToCart,
      });
    } catch (error) {
      Store.addNotification({
        ...notificationsSettings.basic,
        ...notificationsSettings.error,
        message: error.message,
      });
    }
  }

  return (
    <div className="product-detail__order-actions">
      {currentPrice < previousPrice ? (
        <div className="product-detail__price-wrap">
          {Object.entries(price).map(([key, value], index) => (
            <p
              key={index}
              className={`product-detail__price product-detail__price-${
                key === "currentPrice" ? "current" : "previous"
              }`}
            >
              <CurrencyIcon
                currency={currencyName}
                className={`product-detail__currency-icon product-detail__currency-icon-${
                  key === "currentPrice" ? "current" : "previous"
                }`}
                color={key === "currentPrice" ? "#f84147" : "#393D45FF"}
              />
              {Math.floor(value * currencyValue)}
            </p>
          ))}
        </div>
      ) : (
        <p className="product-detail__price">
          <CurrencyIcon
            currency={currencyName}
            className={"product-detail__currency-icon"}
            color={"#393D45FF"}
          />
          {Math.floor(currentPrice * currencyValue)}
        </p>
      )}
      <div className="order-actions__btns-wrap">
        {/* <button type="button" className="order-actions__favs-btn">
        <FavoritesIcon
          color={"red"}
          className={isFav ? "order-actions__favs-icon order-actions__favs-icon--fill" : "order-actions__favs-icon"}
          isFill={isFav}
          clickHandler={isFav ? handleRemoveFromFavorites : handleAddToFavorites}/>
      </button> */}
        <button
          type="button"
          onClick={handleClick}
          className="order-actions__favs-btn"
        >
          <FavoritesIcon
            color={"red"}
            className={
              isItemFavorited(productID)
                ? "order-actions__favs-icon order-actions__favs-icon--fill"
                : "order-actions__favs-icon"
            }
            isFill={isItemFavorited(productID)}
          />
        </button>
        <button
          disabled={outOfStock}
          type="button"
          className="button order-actions__add-btn"
          onClick={onAddButtonClick}
        >
          <span
            className={"order-actions__add-btn-inner"}
            data-tooltip-id={outOfStock ? "order-actions_add-btn" : ""}
            data-tooltip-content={"Max quantity is already in cart"}
          >
            Add to cart
          </span>
        </button>
      </div>
      <div className="product-detail__color-wrap">
        <p className="product-detail__basic-spec">
          Color:{" "}
          <span className="product-detail__basic-spec-value">
            {productColor}
          </span>
        </p>
        <div className="product-detail__color-list">
          {Object.entries(colors).map(([key, value], index) => (
            <Link to={`/products/${key}`} key={index}>
              <span
                className={`product-detail__color-list-item ${
                  productColor === value
                    ? "product-detail__color-list-item--active"
                    : ""
                }`}
                style={{ backgroundColor: value }}
              ></span>
            </Link>
          ))}
        </div>
      </div>
      <OrderQuantity
        productQuantity={quantity}
        orderQuantity={orderQuantity}
        setOrderQuantity={setOrderQuantity}
        productID={productID}
        cart={cart}
        outOfStock={outOfStock}
      />
      <Tooltip id="order-actions_add-btn" place="top" />
    </div>
  );
}