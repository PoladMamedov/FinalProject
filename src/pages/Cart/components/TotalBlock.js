import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TotalBlock = () => {
  const cartProducts = useSelector((state) => state.cart.cart);
  let totalOrderPrice = cartProducts.reduce((accumulator, item) => {
    const { product, cartQuantity } = item;
    const productTotalPrice = product.currentPrice * cartQuantity;
    return accumulator + productTotalPrice;
  }, 0);

  const shippingPrice = ((totalOrderPrice / 100) * 2).toFixed(1);
  return (
    <div className="total-block">
      <div className="total-block-wrapper">
        <div className="total-block__item">
          <span className="total-block__label total-block__label-product">Subtotal</span>
          <span className="total-block__value total-block__value-product">${totalOrderPrice}</span>
        </div>
        <div className="total-block__item">
          <span className="total-block__label total-block__label-shipping ">Shipping Fee</span>
          <span className="total-block__value total-block__value-shipping">${shippingPrice}</span>
        </div>
        <div className="total-block-line"></div>
        <div className="total-block__item">
          <span className="total-block__label total-block__label-total">Total Order </span>
          <span className="total-block__value total-block__value-product">${totalOrderPrice + +shippingPrice}</span>
        </div>
      </div>
      <div className="cart-buttons">
        <Link to={"/"} className={"cart-button cart-button-close"}>Close</Link>
        <Link to={"/"} className="cart-button cart-button-checkout">Check out</Link>
      </div>
    </div>
  );
};

export default TotalBlock;