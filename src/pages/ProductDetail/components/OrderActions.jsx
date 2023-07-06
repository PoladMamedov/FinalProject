import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function OrderActions({
  properties: { color }, quantity, previousPrice, currentPrice, similarProducts, itemNo
}) {

  const [productAmount, setProductAmount] = useState(1);
  const [productColor, setProductColor] = useState("");
  const inputProductAmountRef = useRef(null);

  const colors = {...similarProducts, [itemNo]: color};
  const price = {currentPrice, previousPrice};

  useEffect(() => {
    setProductColor(color);
  }, [color]);

  function onIncreaseBtnClick() {
    if (inputProductAmountRef.current.value < quantity) {
      setProductAmount(+inputProductAmountRef.current.value + 1);
    }
  }
  function onDecreaseBtnClick() {
    if (inputProductAmountRef.current.value > 1) {
      setProductAmount(inputProductAmountRef.current.value - 1);
    }
  }

  function isValidProductAmount(amount) {
    return /^[0-9]*$/.test(amount) && amount > 0 && amount <= quantity;
  }

  function onProductAmountChange(event) {
    if (event.target.value === "") {
      setProductAmount(event.target.value);
    } else if (isValidProductAmount(event.target.value)) {
      setProductAmount(+event.target.value);
    }
  }
  function onProductAmountBlur(event) {
    if (event.target.value === "") {
      inputProductAmountRef.current.focus();
    }
  }

  function onProductAmountKeyDown(event) {
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

  return <div className="product-detail__order-actions">
    {currentPrice < previousPrice ? <div className="product-detail__price-wrap">{Object.entries(price).map(([key, value], index) => <p key={index} className={`product-detail__price product-detail__price-${key === "currentPrice" ? "current" : "previous"}`}>{value}$</p>)}</div> : <p className="product-detail__price">{currentPrice}$</p>}
    <button type="button" className="order-actions__add-btn">Add to cart</button>
    <div className="product-detail__color-wrap">
      <p className="product-detail__basic-spec">Color: <span className="product-detail__basic-spec-value">{productColor}</span></p>
      <div className="product-detail__color-list">
        {Object.entries(colors).map(([key, value], index) => <Link to={`/products/${key}`} key={index}><span className={`product-detail__color-list-item ${productColor === value ? "product-detail__color-list-item--active" : ""}`} style={{backgroundColor: value}}></span></Link>)}
      </div>
    </div>
    <div className="order-actions__quantity-wrap">
      <button type="button" className="order-actions__quantity-item order-actions__decrease-btn" onClick={onDecreaseBtnClick}>-</button>
      <input type="text" className="order-actions__quantity-item order-actions__quantity-input" value={productAmount} onChange={onProductAmountChange} ref={inputProductAmountRef} onBlur={onProductAmountBlur} onKeyDown={onProductAmountKeyDown}/>
      <button type="button" className="order-actions__quantity-item order-actions__increase-btn" onClick={onIncreaseBtnClick}>+</button>
    </div>
  </div>;
}