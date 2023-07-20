import { useSelector } from "react-redux";
import CartItems from "../CartItems/CartItems";

const CartList = () => {
  const cartProducts = useSelector((state) => state.cart.cart);
  return (
      <ul className={"cart-list__items"}>
        {cartProducts.length !== 0 ? cartProducts.map((dataProducts) => (
          // eslint-disable-next-line no-underscore-dangle
          <CartItems key={dataProducts.id} dataProducts={dataProducts} />
        )) : null}
      </ul>
  );
};

export default CartList;