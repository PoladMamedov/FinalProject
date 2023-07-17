import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "react-notifications-component";
import useServer from "../../../hooks/useServer";
import "react-notifications-component/dist/scss/notification.scss";
import "animate.css/animate.min.css";
import FavoritesIcon from "../../../components/FavoritesIcon/FavoritesIcon";
import OrderQuantity from "./OrderQuantity";
import {
  addToCart, fetchCart, setCart, fillCart
} from "../../../redux/actions/cart";
import notificationsSettings from "../../../constants/constants";
import CurrencyIcon from "../../../components/CurrencyIcon/CurrencyIcon";

export default function OrderActions(props) {
  const {
    properties: { color }, quantity, previousPrice, currentPrice, similarProducts, itemNo, _id: productID
  } =  props;

  const {
    getWishlist, addToWishlist, deleteFromWishlist
  } = useServer();

  const dispatch = useDispatch();

  const {userInfo: {token}} = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { currency, currencyName } = useSelector((state) => state.currentCurrency);
  const currencyValue = parseFloat(currency);

  const [productColor, setProductColor] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [favs, setFavs] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const colors = {...similarProducts, [itemNo]: color};
  const price = {currentPrice, previousPrice};

  async function fetchFavs(authToken) {
    try {
      const wishlist = await getWishlist(authToken);
      setFavs(wishlist);
      setIsFav(favs.length && favs.some(({_id}) => _id === productID));
    } catch (error) {
      Store.addNotification({...notificationsSettings.basic, ...notificationsSettings.error, message: error.message});
    }
  }

  useEffect(() => {
    setProductColor(color);
    if (token) {
      fetchFavs(token);
    }
    }, [color]);

  useEffect(() => {
    const productInCart = cart.find(({product: {_id: id}}) => id === productID);
    if (productInCart && productInCart.cartQuantity === quantity) setOutOfStock(true);
  }, [cart]);

  async function addToFavs() {
    try {
      setIsFav(true);
      if (token) {
        const wishlist = await addToWishlist(productID, token);
        setFavs(wishlist);
      }
    } catch (error) {
      Store.addNotification({...notificationsSettings.basic, ...notificationsSettings.error, message: error.message});
    }
  }

  async function deleteFromFavs() {
    try {
      setIsFav(false);
      if (token) {
        const wishlist = await deleteFromWishlist(productID, token);
        setFavs(wishlist);
      }
    } catch (error) {
      Store.addNotification({...notificationsSettings.basic, ...notificationsSettings.error, message: error.message});
    }
  }

  async function onAddButtonClick() {
      try {
        const productInCart = cart.find(({product: {_id: id}}) => id === productID);

        if (token) {
          dispatch(fetchCart(token));
          dispatch(setCart({
            products: [
              {
                product: productID,
                cartQuantity: productInCart ? orderQuantity + productInCart.cartQuantity : orderQuantity
              }
            ]
          }, token));
        } else {
          const productInCartIndx = cart.findIndex(({product: {_id: ID}}) => ID === productID);

          if (productInCart) {
            const filteredCart = cart.filter((product, index) => index !== productInCartIndx);

            dispatch(fillCart([
                  ...filteredCart,
                {
                  product: {...props},
                  cartQuantity: orderQuantity + productInCart.cartQuantity
                }
              ]));
          } else {
            dispatch(addToCart([
                {
                  product: {...props},
                  cartQuantity: productInCart ? orderQuantity + productInCart.cartQuantity : orderQuantity
                }
              ]));
            }
          }

        setOrderQuantity(1);

        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.addedToCart });
      } catch (error) {
        Store.addNotification({...notificationsSettings.basic, ...notificationsSettings.error, message: error.message});
      }
    }

  return <div className="product-detail__order-actions">
    {currentPrice < previousPrice ? <div className="product-detail__price-wrap">{Object.entries(price).map(([key, value], index) => <p
          key={index}
          className={`product-detail__price product-detail__price-${key === "currentPrice" ? "current" : "previous"}`}
      >
       <CurrencyIcon currency={currencyName} className={`product-detail__currency-icon product-detail__currency-icon-${key === "currentPrice" ? "current" : "previous"}`} color={key === "currentPrice" ? "#f84147" : "#393D45FF"}/>
        {Math.floor(value * currencyValue)}
      </p>)}
    </div>
      : <p className="product-detail__price">
         <CurrencyIcon currency={currencyName} className={"product-detail__currency-icon"} color={"#393D45FF"}/>
        {Math.floor(currentPrice * currencyValue)}
      </p>}
    <div className="order-actions__btns-wrap">
      {isFav ? <FavoritesIcon color={"red"} className={"order-actions__favs-btn order-actions__favs-btn--fill"} isFill clickHandler={() => deleteFromFavs()}/>
        : <FavoritesIcon color={"red"} className={"order-actions__favs-btn"} clickHandler={() => addToFavs()}/>}
      <button disabled={outOfStock} title={outOfStock ? "Out of stock" : ""} type="button" className="order-actions__add-btn" onClick={onAddButtonClick}>Add to cart</button>
    </div>
    <div className="product-detail__color-wrap">
      <p className="product-detail__basic-spec">Color: <span className="product-detail__basic-spec-value">{productColor}</span></p>
      <div className="product-detail__color-list">
        {Object.entries(colors).map(([key, value], index) => <Link to={`/products/${key}`} key={index}><span className={`product-detail__color-list-item ${productColor === value ? "product-detail__color-list-item--active" : ""}`} style={{backgroundColor: value}}></span></Link>)}
      </div>
    </div>
    <OrderQuantity productQuantity={quantity} orderQuantity={orderQuantity} setOrderQuantity={setOrderQuantity} productID={productID} cart={cart} outOfStock={outOfStock}/>
  </div>;
}