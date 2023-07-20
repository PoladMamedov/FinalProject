import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartList from "../../components/CartList/CartList";
import NovaPoshtaForm from "../../components/NovaPoshtaForm/NovaPoshtaForm";
import TotalBlock from "./components/TotalBlock";
import CartHeader from "./components/CartHeader";
import CartSkeleton from "./components/CartSkeleton";
import { fetchCart } from "../../redux/actions/cart";

const Cart = () => {
  const userToken = useSelector((state) => state.user.userInfo.token);
  const cartProducts = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartProducts.length === 0 && userToken ) {
      dispatch(fetchCart(userToken));
    }
  }, [userToken]);

  return (
    <section className="cart-section">
      <div className={"container"}>
        {cartProducts.length !== 0 ? (
          <>
            <CartHeader />
            <CartList />
            <TotalBlock />
          </>
        ) : (
          <CartSkeleton />
        )}
      </div>
      <NovaPoshtaForm />
    </section>
  );
};

export default Cart;
