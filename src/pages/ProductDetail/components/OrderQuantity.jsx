import React, { useRef } from "react";

export default function OrderQuantity({productQuantity, orderQuantity, setOrderQuantity, productID, cart}) {
  const inputOrderQuantityRef = useRef(null);

  function onIncreaseBtnClick() {
    if (inputOrderQuantityRef.current.value < productQuantity) {
      setOrderQuantity(+inputOrderQuantityRef.current.value + 1);
    }
  }
  function onDecreaseBtnClick() {
    if (inputOrderQuantityRef.current.value > 1) {
      setOrderQuantity(inputOrderQuantityRef.current.value - 1);
    }
  }

  function isValidOrderQuantity(inputQuantity, quantit) {
    return /^[0-9]*$/.test(inputQuantity) && inputQuantity > 0 && inputQuantity <= quantity;
  }

  function onOrderQuantityChange(event) {
    const productInCart = cart.find(({product: {_id: id}}) => id === productID);

    if (event.target.value === "") {
      setOrderQuantity(event.target.value);
    } else if (isValidOrderQuantity(event.target.value, productQuantity)) {
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

  return <div className="order-actions__quantity-wrap">
    <button disabled={orderQuantity === 1} type="button" className="order-actions__quantity-item order-actions__decrease-btn" onClick={onDecreaseBtnClick}>-</button>
    <input type="text" className="order-actions__quantity-item order-actions__quantity-input" value={orderQuantity} onChange={onOrderQuantityChange} ref={inputOrderQuantityRef} onBlur={onOrderQuantityBlur} onKeyDown={onOrderQuantityKeyDown}/>
    <button disabled={orderQuantity === productQuantity} type="button" className="order-actions__quantity-item order-actions__increase-btn" onClick={onIncreaseBtnClick}>+</button>
  </div>;
}