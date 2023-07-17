const CartItems = (props) => {
  const {cartQuantity, product: {name, currentPrice}} = props.dataProducts;
  return (
    <li className="cart-list__item">
      <img className={"cart-list__item-image"} src="/img/products/headphones/apple/004.png" alt="item-img"/>
      <div className="cart-list__item-details">
        <p className="cart-list__item-title">{name}</p>
        <p className="cart-list__item-price">${currentPrice}</p>
        <div className="cart-list__item-quantity">
          <button type={"button"} className="cart-list__item-quantity-minus">-</button>
          <span className="cart-list__item-quantity-number">{cartQuantity}</span>
          <button type={"button"} className="cart-list__item-quantity-plus">+</button>
        </div>
        <img className={"cart-list__item-icon"} src="/img/cart-trash-icon.png" alt="delete item from cart"/>
      </div>
    </li>
  );
};

export default CartItems;

