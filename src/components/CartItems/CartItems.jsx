import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CartItems = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout"; // Предположим, что страница чекаута имеет путь "/checkout"
  const [isCheckout, setIsCheckout] = useState(isCheckoutPage);

  useEffect(() => {
    setIsCheckout(isCheckoutPage);
  }, [isCheckoutPage]);
  return (
    // <li className="cart-list__item">
    //   <img className={"cart-list__item-image"} src="/img/products/headphones/apple/004.png" alt="item-img"/>
    //   <div className="cart-list__item-details">
    //     <p className="cart-list__item-title">Logitech G99</p>
    //     <p className="cart-list__item-price">$10</p>
    //     <div className="cart-list__item-quantity">
    //       <button type={"button"} className="cart-list__item-quantity-minus">-</button>
    //       <span className="cart-list__item-quantity-number">0</span>
    //       <button type={"button"} className="cart-list__item-quantity-plus">+</button>
    //     </div>
    //     <img className={"cart-list__item-icon"} src="/img/cart-trash-icon.png" alt="delete item from cart"/>
    //   </div>
    // </li>
    <>
      <li className={`cart-list__item ${isCheckout ? "none" : ""}`}>
        <img
          className={"cart-list__item-image"}
          src="/img/products/headphones/apple/004.png"
          alt="item-img"
        />
        <div className="cart-list__item-details">
          <p className="cart-list__item-title">Logitech G99</p>
          <p className="cart-list__item-price">$10</p>
          <div className="cart-list__item-quantity">
            <button type={"button"} className="cart-list__item-quantity-minus">
              -
            </button>
            <span className="cart-list__item-quantity-number">0</span>
            <button type={"button"} className="cart-list__item-quantity-plus">
              +
            </button>
          </div>
          <img
            className={"cart-list__item-icon  "}
            src="/img/cart-trash-icon.png"
            alt="delete item from cart"
          />
        </div>
      </li>

      <li className={`checkout-cart-list__item ${isCheckout ? "" : "none"}`}>
        <img
          className={"checkout-cart-list__item-image"}
          src="/img/products/headphones/apple/004.png"
          alt="item-img"
        />
        <div className="checkout-cart-list__item-details">
          <p className="checkout-cart-list__item-title">Logitech G99</p>
          <p className="checkout-cart-list__item-price">$10</p>
          <div className="checkout-cart-list__item-quantity">
            <button
              type={"button"}
              className="checkout-cart-list__item-quantity-minus"
            >
              -
            </button>
            <span className="checkout-cart-list__item-quantity-number">0</span>
            <button
              type={"button"}
              className="checkout-cart-list__item-quantity-plus"
            >
              +
            </button>
          </div>
          <img
            className={"checkout-cart-list__item-icon  "}
            src="/img/cart-trash-icon.png"
            alt="delete item from cart"
          />
        </div>
      </li>
    </>
  );
};

export default CartItems;
