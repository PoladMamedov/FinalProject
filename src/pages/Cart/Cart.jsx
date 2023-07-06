import { Link } from "react-router-dom";
import CartList from "../../components/CartList/CartList";

const CartPage = () => {
  return (
    <section className="cart-section">
      <div className={"container"}>
        <div className="cart-list__headers">
          <p className="cart-list__header">Product</p>
          <p className="cart-list__header">Price</p>
          <p className="cart-list__header">Quantity</p>
          <p className="cart-list__header">Total</p>
        </div>
        <CartList/>
        <div className="total-block">
          <div className="total-block-wrapper">
            <div className="total-block__item">
              <span className="total-block__label total-block__label-product">Subtotal</span>
              <span className="total-block__value total-block__value-product">$90</span>
            </div>
            <div className="total-block__item">
              <span className="total-block__label total-block__label-shipping ">Shipping Fee</span>
              <span className="total-block__value total-block__value-shipping">$5</span>
            </div>
            <div className="total-block-line"></div>
            <div className="total-block__item">
              <span className="total-block__label total-block__label-total">Total Order </span>
              <span className="total-block__value total-block__value-product">$95</span>
            </div>
          </div>
          <div className="cart-buttons">
            <Link to={"/"} className={"cart-button cart-button-close"}>Close</Link>
            <Link to={"/"} className="cart-button cart-button-checkout">Check out</Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CartPage;
