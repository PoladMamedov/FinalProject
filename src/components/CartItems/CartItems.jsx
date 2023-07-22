import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  removeCartAsync,
  removeCart,
  increaseCart,
  increaseCartAsync,
  decreaseCartAsync,
  decreaseCart,
} from "../../redux/actions/cart";

const CartItems = (props) => {
    const location = useLocation();
    const isCheckoutPage = location.pathname === "/checkout";
    // eslint-disable-next-line no-unused-vars
    const [isCheckout, setIsCheckout] = useState(isCheckoutPage);
    useEffect(() => {
      setIsCheckout(isCheckoutPage);
    }, [isCheckoutPage]);
  
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.userInfo.token);
  
  const {
    cartQuantity,
    product: {
      name, currentPrice, imageUrls, itemNo
    },
  } = props.dataProducts;
  // eslint-disable-next-line no-underscore-dangle
  const itemId = props.dataProducts.product._id;

  const OnDeleteItem = async (item, token) => {
    try {
      if (token) {
        dispatch(removeCartAsync(item, token));
      } else {
        dispatch(removeCart(item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onIncreaseItem = async (item, token) => {
    try {
      if (token) {
        dispatch(increaseCartAsync(item, token));
      } else {
        dispatch(increaseCart(item));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDecreaseItem = async (item, token) => {
    try {
      if (token) {
        dispatch(decreaseCartAsync(item, token));
      } else {
        dispatch(decreaseCart(item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <li className={`cart-list__item ${isCheckout ? "none" : ""}`}>
        {/* <img className={"cart-list__item-image"} src={imageUrls[0]} alt="item-img" /> */}
        <Link className="cart-list__item-image-wrap" to={`/products/${itemNo}`}>
          {" "}
          <img
            className={"cart-list__item-image"}
            src={imageUrls[0]}
            alt="item-img"
          />
        </Link>
        <div className="cart-list__item-details">
          <Link to={`/products/${itemNo}`} className="cart-list__item-title">
            {name}
          </Link>
          <p className="cart-list__item-price">${currentPrice}</p>
          <div className="cart-list__item-quantity">
            <button
              type={"button"}
              className="cart-list__item-quantity-minus"
              onClick={() => onDecreaseItem(itemId, userToken)}
              disabled={cartQuantity <= 1}
            >
              -
            </button>
            <input
              type={"text"}
              className="cart-list__item-quantity-number"
              value={cartQuantity}
            />
            <button
              type={"button"}
              className="cart-list__item-quantity-plus"
              onClick={() => onIncreaseItem(itemId, userToken)}
              disabled={cartQuantity === props.dataProducts.product.quantity}
            >
              +
            </button>
          </div>
          <button
            type={"button"}
            className={"cart-list__item-button"}
            onClick={() => OnDeleteItem(itemId, userToken)}
          >
            <img
              className={"cart-list__item-icon"}
              src="/img/cart-trash-icon.png"
              alt="delete item from cart"
            />
          </button>
        </div>
      </li>

      <li className={`checkout-cart-list__item ${isCheckout ? "" : "none"}`}>
        {/* <img className={"cart-list__item-image"} src={imageUrls[0]} alt="item-img" /> */}
        <Link
          className="checkout-cart-list__item-image-wrap"
          to={`/products/${itemNo}`}
        >
          {" "}
          <img
            className={"checkout-cart-list__item-image"}
            src={imageUrls[0]}
            alt="item-img"
          />
        </Link>
        <div className="checkout-cart-list__item-details">
          <Link
            to={`/products/${itemNo}`}
            className="checkout-cart-list__item-title"
          >
            {name}
          </Link>
          <p className="checkout-cart-list__item-price">${currentPrice}</p>
          <div className="checkout-cart-list__item-quantity">
            <button
              type={"button"}
              className="checkout-cart-list__item-quantity-minus"
              onClick={() => onDecreaseItem(itemId, userToken)}
              disabled={cartQuantity <= 1}
            >
              -
            </button>
            <input
              type={"text"}
              className="checkout-cart-list__item-quantity-number"
              value={cartQuantity}
            />
            <button
              type={"button"}
              className="checkout-cart-list__item-quantity-plus"
              onClick={() => onIncreaseItem(itemId, userToken)}
              disabled={cartQuantity === props.dataProducts.product.quantity}
            >
              +
            </button>
          </div>
          <button
            type={"button"}
            className={"checkout-cart-list__item-button"}
            onClick={() => OnDeleteItem(itemId, userToken)}
          >
            <img
              className={"checkout-cart-list__item-icon"}
              src="/img/cart-trash-icon.png"
              alt="delete item from cart"
            />
          </button>
        </div>
      </li>
    </>
  );
};

export default CartItems;
