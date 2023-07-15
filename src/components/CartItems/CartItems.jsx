import { Image } from "cloudinary-react";
import cloudinaryConfig from "../../config/cloudinaryConfig";

const CartItems = () => {

  return (
    <li className="cart-list__item">
      <img className={"cart-list__item-image"} src="/img/products/headphones/apple/004.png" alt="item-img" />
      <div className="cart-list__item-details">
        <p className="cart-list__item-title">Logitech G99</p>
        <p className="cart-list__item-price">$10</p>
        <div className="cart-list__item-quantity">
          <button type={"button"} className="cart-list__item-quantity-minus">-</button>
          <span className="cart-list__item-quantity-number">0</span>
          <button type={"button"} className="cart-list__item-quantity-plus">+</button>
        </div>
        <Image
          cloudName={cloudinaryConfig.cloudName}
          publicId="cart-trash-icon_mwntsr"
          className={"cart-list__item-icon"}
          alt="delete item from cart" />
      </div>
    </li>
  );
};

export default CartItems;

