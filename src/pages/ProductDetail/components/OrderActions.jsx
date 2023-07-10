import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "react-notifications-component";
import useServer from "../../../hooks/useServer";
import "react-notifications-component/dist/scss/notification.scss";
import "animate.css/animate.min.css";


// TODO: show message if unauthorized
// TODO: add favorite icon
// TODO: use library to show message

export default function OrderActions({
  properties: { color }, quantity, previousPrice, currentPrice, similarProducts, itemNo, _id: productID
}) {
  const {updateCart} = useServer();
  const {userInfo: {token}} = useSelector((state) => state.user);

  const [orderQuantity, setOrderQuantity] = useState(1);
  const [productColor, setProductColor] = useState("");
  const inputOrderQuantityRef = useRef(null);

  const colors = {...similarProducts, [itemNo]: color};
  const price = {currentPrice, previousPrice};

  useEffect(() => {
    setProductColor(color);
  }, [color]);

  function onIncreaseBtnClick() {
    if (inputOrderQuantityRef.current.value < quantity) {
      setOrderQuantity(+inputOrderQuantityRef.current.value + 1);
    }
  }
  function onDecreaseBtnClick() {
    if (inputOrderQuantityRef.current.value > 1) {
      setOrderQuantity(inputOrderQuantityRef.current.value - 1);
    }
  }

  function isValidOrderQuantity(amount) {
    return /^[0-9]*$/.test(amount) && amount > 0 && amount <= quantity;
  }

  function onOrderQuantityChange(event) {
    if (event.target.value === "") {
      setOrderQuantity(event.target.value);
    } else if (isValidOrderQuantity(event.target.value)) {
      setOrderQuantity(+event.target.value);
    }
  }
  function onOrderQuantityBlur(event) {
    if (event.target.value === "") {
      inputOrderQuantityRef.current.focus();
    }
  }

  function onOrderQuantityKeyDown(event) {
    if ([69, 187, 189, 190].includes(event.keyCode)) {
      event.preventDefault();
    }
    if (event.keyCode === 38) {
      event.preventDefault();
      onIncreaseBtnClick();
    }
    if (event.keyCode === 40) {
      event.preventDefault();
      onDecreaseBtnClick();
    }
  }

  async function onAddButtonClick() {
      try {
        const products = {
          products: [
            {
              product: productID,
              cartQuantity: orderQuantity
            }
          ]
        };
        await updateCart(products, token);
        setOrderQuantity(1);

        Store.addNotification({
          title: "Success!",
          message: "Product added to cart",
          type: "success",
          insert: "bottom",
          container: "bottom-left",
          dismiss: {
            duration: 5000,
            showIcon: true
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

  return <div className="product-detail__order-actions">
    {currentPrice < previousPrice ? <div className="product-detail__price-wrap">{Object.entries(price).map(([key, value], index) => <p key={index} className={`product-detail__price product-detail__price-${key === "currentPrice" ? "current" : "previous"}`}>{value}$</p>)}</div> : <p className="product-detail__price">{currentPrice}$</p>}
    <button type="button" className="order-actions__add-btn" onClick={onAddButtonClick}>Add to cart</button>
    <div className="product-detail__color-wrap">
      <p className="product-detail__basic-spec">Color: <span className="product-detail__basic-spec-value">{productColor}</span></p>
      <div className="product-detail__color-list">
        {Object.entries(colors).map(([key, value], index) => <Link to={`/products/${key}`} key={index}><span className={`product-detail__color-list-item ${productColor === value ? "product-detail__color-list-item--active" : ""}`} style={{backgroundColor: value}}></span></Link>)}
      </div>
    </div>
    <div className="order-actions__quantity-wrap">
      <button disabled={orderQuantity === 1} type="button" className="order-actions__quantity-item order-actions__decrease-btn" onClick={onDecreaseBtnClick}>-</button>
      <input type="text" className="order-actions__quantity-item order-actions__quantity-input" value={orderQuantity} onChange={onOrderQuantityChange} ref={inputOrderQuantityRef} onBlur={onOrderQuantityBlur} onKeyDown={onOrderQuantityKeyDown}/>
      <button disabled={orderQuantity === quantity} type="button" className="order-actions__quantity-item order-actions__increase-btn" onClick={onIncreaseBtnClick}>+</button>
    </div>
  </div>;
}