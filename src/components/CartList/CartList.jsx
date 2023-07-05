import CartItems from "../CartItems/CartItems";

const CartList = () => {
  return (
      <ul className={"cart-list__items"}>
        <CartItems/>
        <CartItems/>
      </ul>
  );
};

export default CartList;