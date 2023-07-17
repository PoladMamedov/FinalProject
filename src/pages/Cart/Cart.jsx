import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartList from "../../components/CartList/CartList";
import { fetchCart } from "../../redux/actions/cart";
import TotalBlock from "./components/TotalBlock";
import CartHeader from "./components/CartHeader";

const Cart = () => {
  const userToken = useSelector((state) => state.user.userInfo.token);
  const cartProducts = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartProducts.length === 0 && userToken ) {
      console.log("hello");
      dispatch(fetchCart(userToken));
    }
  }, [userToken]);
  return (
    <section className="cart-section">
      <div className={"container"}>
        <CartHeader/>
        <CartList/>
        <TotalBlock/>
      </div>
    </section>
  );
};

export default Cart;
