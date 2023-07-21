import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
} from "../../redux/actions/favorites";

const Favorites = () => {
  // Получение списка избранных товаров из состояния Redux
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const { currency, currencyName } = useSelector(
    (state) => state.currentCurrency
  );
  const currencyValue = parseFloat(currency);

  // Обработчик удаления товара из списка избранных
  const handleRemoveFromFavorites = (product) => {
    dispatch(removeFromFavorites(product));
  };

  return (
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
                <img
                  className={"favorites__item-img"}
                  src={product.imageUrls[0]}
                  alt="item-img"
                />
              )}
              <div className="favorites__item-details">
                <p className="favorites__item-title">{product.name}</p>
                <p className="favorites__item-price">
                  <img
                    className="currency-icon--rows"
                    src={`/img/currency/${currencyName}-icon.png`}
                    alt="currency-icon"
                  />
                  {Math.floor(product.currentPrice * currencyValue)}
                </p>
                <div className="favorites__item-add">
                  <button type="button" className="favorites__item-add-minus">
                    -
                  </button>
                  <span className="favorites__item-add-number">0</span>
                  <button type="button" className="favorites__item-add-plus">
                    +
                  </button>
                </div>
                <button
                  className={"favorites__item-icon-button"}
                  onClick={() => handleRemoveFromFavorites(product.itemNo)}
                  type="button"
                >
                  <img
                    className={"favorites__item-icon"}
                    src="https://res.cloudinary.com/dfinki0p4/image/upload/v1689177285/cart-trash-icon_mwntsr.png"
                    alt="delete item from favorites"
                  />
                </button>
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
  );
};

export default Favorites;
