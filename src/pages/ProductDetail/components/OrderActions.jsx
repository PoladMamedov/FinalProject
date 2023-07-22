import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/scss/notification.scss";
import "animate.css/animate.min.css";
import FavoritesIcon from "../../../components/FavoritesIcon/FavoritesIcon";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/actions/favorites";
import OrderQuantity from "./OrderQuantity";
import {
  addToCart, fetchCart, setCart, fillCart
} from "../../../redux/actions/cart";
import notificationsSettings from "../../../constants/constants";
import CurrencyIcon from "../../../components/CurrencyIcon/CurrencyIcon";

export default function OrderActions(props) {
  const {
    properties: { color }, quantity, previousPrice, currentPrice, similarProducts, itemNo, _id: productID
  } = props;


  const dispatch = useDispatch();


  const { userInfo: { token } } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { currency, currencyName } = useSelector((state) => state.currentCurrency);
  const favorites = useSelector((state) => state.favorites.favorites);
  const currencyValue = parseFloat(currency);

  const [productColor, setProductColor] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const colors = { ...similarProducts, [itemNo]: color };
  const price = { currentPrice, previousPrice };

  const handleAddToFavorites = async () => {
    const nameWithoutLastWord = props.name.slice(
      0,
      props.name.lastIndexOf(" ")
    );
    const newItem = {
      imageUrls: [props.imageUrls[0]],
      name: nameWithoutLastWord,
      currentPrice,
      quantity,
      itemNo,
    };
    dispatch(addToFavorites(newItem));

    setIsFav(true);

  };
  const handleRemoveFromFavorites = () => {
    setIsFav(false);
    dispatch(removeFromFavorites(itemNo));

  };

  useEffect(() => {
    setProductColor(color);
    setIsFav(favorites.find((item) => item.itemNo === itemNo));
  }, [color]);

  useEffect(() => {
    const productInCart = cart.find(({ product: { _id: id } }) => id === productID);
    if (productInCart && productInCart.cartQuantity === quantity) setOutOfStock(true);
  }, [cart]);

  async function onAddButtonClick() {
    try {
      if (token) dispatch(fetchCart(token));

      const productInCart = cart.find(({ product: { _id: id } }) => id === productID);
      const productInCartIndx = cart.findIndex(({ product: { _id: id } }) => id === productID);
      const filteredCart = cart.filter((product, index) => index !== productInCartIndx);

      if (token && filteredCart.length === 0) {
        dispatch(setCart({
          products: [
            {
              product: productID,
              cartQuantity: productInCart ? orderQuantity + productInCart.cartQuantity : orderQuantity
            }
          ]
        }, token));
      } else if (token && filteredCart.length) {
        dispatch(setCart({
          products: [
            ...filteredCart.map(({ product: { _id: id }, cartQuantity }) => ({ product: id, cartQuantity })),
            {
              product: productID,
              cartQuantity: productInCart ? orderQuantity + productInCart.cartQuantity : orderQuantity
            }
          ]
        }, token));
      } else if (productInCart) {
        dispatch(fillCart([
          ...filteredCart,
          {
            product: { ...props },
            cartQuantity: orderQuantity + productInCart.cartQuantity
          }
        ]));
      } else {
        dispatch(addToCart([
          {
            product: { ...props },
            cartQuantity: productInCart ? orderQuantity + productInCart.cartQuantity : orderQuantity
          }
        ]));
      }

      setOrderQuantity(1);

      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.addedToCart });
    } catch (error) {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.error, message: error.message });
    }
  }

  return <div className="product-detail__order-actions">
    {currentPrice < previousPrice ? <div className="product-detail__price-wrap">{Object.entries(price).map(([key, value], index) => <p
      key={index}
      className={`product-detail__price product-detail__price-${key === "currentPrice" ? "current" : "previous"}`}
    >
      <CurrencyIcon currency={currencyName} className={`product-detail__currency-icon product-detail__currency-icon-${key === "currentPrice" ? "current" : "previous"}`} color={key === "currentPrice" ? "#f84147" : "#393D45FF"} />
      {Math.floor(value * currencyValue)}
    </p>)}
    </div>
      : <p className="product-detail__price">
        <CurrencyIcon currency={currencyName} className={"product-detail__currency-icon"} color={"#393D45FF"} />
        {Math.floor(currentPrice * currencyValue)}
      </p>}
    <div className="order-actions__btns-wrap">
      <FavoritesIcon
        color={"red"}
        className={isFav ? "order-actions__favs-btn order-actions__favs-btn--fill" : "order-actions__favs-btn"}
        isFill={isFav}
        clickHandler={isFav ? handleRemoveFromFavorites : handleAddToFavorites} />
      <button disabled={outOfStock} type="button" className="order-actions__add-btn" onClick={onAddButtonClick}><span className={"order-actions__add-btn-inner"} data-tooltip-id={outOfStock ? "order-actions_add-btn" : ""} data-tooltip-content={"Max quantity is already in cart"}>Add to cart</span></button>
    </div>
    <div className="product-detail__color-wrap">
      <p className="product-detail__basic-spec">Color: <span className="product-detail__basic-spec-value">{productColor}</span></p>
      <div className="product-detail__color-list">
        {Object.entries(colors).map(([key, value], index) => <Link to={`/products/${key}`} key={index}><span className={`product-detail__color-list-item ${productColor === value ? "product-detail__color-list-item--active" : ""}`} style={{ backgroundColor: value }}></span></Link>)}
      </div>
    </div>
    <OrderQuantity productQuantity={quantity} orderQuantity={orderQuantity} setOrderQuantity={setOrderQuantity} productID={productID} cart={cart} outOfStock={outOfStock} />
    <Tooltip
      id="order-actions_add-btn"
      place="top"
    />
  </div>;
}