import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
} from "../../redux/actions/favorites";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { increaseCart, increaseCartAsync } from "../../redux/actions/cart";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const { currency, currencyName } = useSelector(
    (state) => state.currentCurrency
  );
  const currencyValue = parseFloat(currency);
  const userToken = useSelector((state) => state.user.userInfo.token);

  const handleRemoveFromFavorites = (product) => {
    dispatch(removeFromFavorites(product));
  };
 
  const onAddItemToCart = async (item, token, productInfo) => {
    try {
      if (token) {
        dispatch(increaseCartAsync(item, token, productInfo));
      } else {
        dispatch(increaseCart(item, productInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <BreadCrumb />
    <section className="favorites">
      <div className={"container"}>
        <div className="favorites__header">
          <p className="favorites__header-list">Product</p>
          <p className="favorites__header-list">Price</p>
          <p className="favorites__header-list">Add to Cart</p>
          <p className="favorites__header-list">Delete</p>
        </div>
        <div className="favorites__item-block">
          {favorites && favorites.map((product) => (
            <div className="favorites__item" key={product.itemNo}>
              {product.imageUrls && product.imageUrls[0] && (
               <Link className="cart-list__item-image-wrap" to={`/products/${product.itemNo}`}>
                <img
                  className={"favorites__item-img"}
                  src={product.imageUrls[0]}
                  alt="item-img"
                />
                </Link>
              )}
              <div className="favorites__item-details">
                <p className="favorites__item-title">
                  <Link to={`/products/${product.itemNo}`} className="cart-list__item-title">{product.name}</Link>
                  </p>
                <p className="favorites__item-price">
                  <img
                    className="currency-icon--rows"
                    src={`/img/currency/${currencyName}-icon.png`}
                    alt="currency-icon"
                  />
                  {Math.floor(product.currentPrice * currencyValue)}
                </p>
                <div className="favorites__item-add">
                  <button
                   className="favorites__item-add-cart"
                   type="button"
                   onClick={() => onAddItemToCart(product.itemNo, userToken, product)}>
                    <img
                    className={"favorites__item-add-cart-icon"}
                    src="/img/cart-logo.png"
                    alt="delete item from favorites"
                  />
                  </button>
                </div>
                <div className="favorites__item-remove">
                <button
                  className={"favorites__item-remove-btn"}
                  onClick={() => handleRemoveFromFavorites(product.itemNo)}
                  type="button"
                >
                  <img
                    className={"favorites__item-remove-icon"}
                    src="/img/cart-trash-icon.png"
                    alt="delete item from favorites"
                  />
                </button>
                </div>
              </div>
            </div>
          ))}
          <div className="favorites__button">
            <Link to={"/"} className={"favorites__button-close"}>
              Close
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Favorites;