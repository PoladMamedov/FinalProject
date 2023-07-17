import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartList from "../../components/CartList/CartList";
import { fetchCart } from "../../redux/actions/cart";

const Cart = () => {
  const userToken = useSelector((state) => state.user.userInfo.token);
  const cartProducts = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  let totalOrderPrice = cartProducts.reduce((accumulator, item) => {
    const { product, cartQuantity } = item;
    const productTotalPrice = product.currentPrice * cartQuantity;
    return accumulator + productTotalPrice;
  }, 0);

  const shippingPrice = ((totalOrderPrice / 100) * 2).toFixed(1);

  useEffect(() => {
    if (cartProducts.length === 0 && userToken ) {
      console.log("hello");
      dispatch(fetchCart(userToken));
    }
  }, [userToken]);
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

      </div>
    </section>
  );
};

export default Cart;
