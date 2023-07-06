import React from "react";
import { Link } from "react-router-dom";
// import { useSelector, shallowEqual } from "react-redux";

const Favorites = () => {
  // const items = useSelector((state) => state.items.data, shallowEqual);
  // const favourites = items.filter((item) => item.favourite);
  // console.log(favourites, "Favourites");
  return (
    <section className="favorites">
      <div className={"container"}>
        <div className="favorites__header">
          <p className="favorites__header-list">Product</p>
          <p className="favorites__header-list">Price</p>
          <p className="favorites__header-list">Quantity</p>
          <p className="favorites__header-list">Add to Cart</p>
          <p className="favorites__header-list">Delete</p>
        </div>
        <div className="favorites__item-block">
          <div className="favorites__item">
            <img
              className={"favorites__item-img"}
              src="/img/products/headphones/apple/004.png"
              alt="item-img"
            />
            <div className="favorites__item-details">
              <p className="favorites__item-title">Logitech G99</p>
              <p className="favorites__item-price">$10</p>
              <div className="favorites__item-quantity">
                <span className="favorites__item-quantity-no">0</span>
              </div>
              <div className="favorites__item-add">
                <button
                  type={"button"}
                  className="favorites__item-add-minus"
                >
                  -
                </button>
                <span className="favorites__item-add-number">0</span>
                <button
                  type={"button"}
                  className="favorites__item-add-plus"
                >
                  +
                </button>
              </div>
              <img
                className={"favorites__item-icon"}
                src="/img/cart-trash-icon.png"
                alt="delete item from cart"
              />
            </div>
          </div>
          <div className="favorites__button">
            <Link to={"/"} className={"favorites__button-close"}>
              Close
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
