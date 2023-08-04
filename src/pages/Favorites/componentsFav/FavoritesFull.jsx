import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "react-notifications-component";
import {
  // decreaseFav, decreaseFavAsync,
 setFav, fetchFav,
 removeFromFavorites, removeFromFavAsync,
//  increaseFav, increaseFavAsync, updateFavQuantity, setFav,
} from "../../../redux/actions/favorites";
import { increaseCart, increaseCartAsync, setCart } from "../../../redux/actions/cart";
import notificationsSettings from "../../../constants/constants";

const FavoritesFull = (props) => {
  // const favoritedProducts =  props.favorites;
  const [favoritedProducts, setFavoritedProducts] = useState(props.favorites);
  favoritedProducts.map((item) => {
    const {
      favQuantity,
      product: {
        imageUrls, name, currentPrice, itemNo
      },
    } = item;

    console.log("+++++++", favQuantity, imageUrls[0], name, currentPrice, itemNo);
    return {
      ...item,
      favQuantity,
      imageUrls,
      name,
      currentPrice,
      itemNo,
    };
  });

 // Получаем диспетчер и данные о токене и элементах корзины из стейта с помощью хуков useDispatch() и useSelector()
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.userInfo.token);
  const favorites = useSelector((state) => state.favorites.favorites);
  const { currency, currencyName } = useSelector(
    (state) => state.currentCurrency
  );
  const currencyValue = parseFloat(currency);

  useEffect(() => {
    if (favorites.length === 0 && userToken) {
      dispatch(fetchFav(userToken));
    }
  }, [userToken]);

  // Используем useEffect() для обновления корзины на сервере при изменении количества товаров
  useEffect(() => {
    if (userToken) {
      const updatedFav = {
        products: favorites.map((item) => ({
          product: item.product._id,
          favQuantity: item.favQuantity,
        })),
      };
      dispatch(setFav(updatedFav, userToken));
    }
  }, []);
  console.error("ttttt-tt", favoritedProducts);

  const handleRemoveFromFavorites = async (item, token) => {
    console.error("ttttt-tt", item);
    try {
      if (token) {
        dispatch(removeFromFavAsync(item, token));
        setFavoritedProducts(favoritedProducts.filter((product) => product.id !== item));
      } else {
        setFavoritedProducts(favoritedProducts.filter((product) => product.id !== item));
        dispatch(removeFromFavorites(item));
      }
    } catch (error) {
      

      Store.addNotification({
        ...notificationsSettings.basic,
        ...notificationsSettings.error,
        message: error.message,
      });
    }
  };

  // useEffect(() => {
  //   if (userToken) {
  //     const updatedCart = {
  //       products: cartProducts.map((item) => ({
  //         product: item.product._id,
  //         cartQuantity: item.cartQuantity,
  //       })),
  //     };
  //     dispatch(setCart(updatedCart, userToken));
  //   }
  // }, [cartQuantity]);

  // const { cart } = useSelector((state) => state.cart);
  // const onAddItemToCart = async (item, token, productInfo) => {
  //   // console.log("onAddItemToCart", onAddItemToCart);
  //   try {
  //     // Check if the product is already in the cart
  //     const isProductInCart = cart.some((cartItem) => cartItem.product._id === productInfo._id);
  //     // console.log("isProductInCart", isProductInCart);
  //     if (!isProductInCart) {
  //       if (token) {
  //         dispatch(increaseCartAsync(item, token, productInfo));
  //       } else {
  //         dispatch(increaseCart(item, productInfo));
  //       }
  //     } else {
  //       // If the product is already in the cart, you can show a notification or handle it as needed.
  //       Store.addNotification({
  //         ...notificationsSettings.basic,
  //         message: "This product is already in the cart.",
  //       });
  //     }
  //   } catch (error) {
  //     Store.addNotification({
  //       ...notificationsSettings.basic,
  //       ...notificationsSettings.error,
  //     });
  //   }
  // };
  
  const [showCartList, setShowCartList] = useState(false);

  const onAddItemToCart = async (item, token, productInfo) => {
    console.warn("cartcart", item, productInfo);
    try {
      if (token) {
        dispatch(increaseCartAsync(item, token, productInfo));
        setShowCartList(true);
      } else {
        dispatch(increaseCart(item, productInfo));
        setShowCartList(true);
      }
    } catch (error) {
      Store.addNotification({
        ...notificationsSettings.basic,
        ...notificationsSettings.error,
      });
    }
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
          {favoritedProducts && favoritedProducts.map(({product}) => (
              <div className="favorites__item" key={product.itemNo}>
                {product.imageUrls && product.imageUrls[0] && (
                  <Link
                    className="cart-list__item-image-wrap"
                    to={`/products/${product.itemNo}`}
                  >
                    <img
                      className={"favorites__item-img"}
                      src={product.imageUrls[0]}
                      alt="item-img"
                    />
                  </Link>
                )}
                <div className="favorites__item-details">
                  <p className="favorites__item-title">
                    <Link
                      to={`/products/${product.itemNo}`}
                      className="cart-list__item-title"
                    >
                      {product.name}
                    </Link>
                  </p>
                  <p className="favorites__item-price">
                    <img
                      className="currency-icon--rows"
                      src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`}
                      alt="currency-icon"
                    />
                    {Math.floor(product.currentPrice * currencyValue)}
                  </p>
                  <div className="favorites__item-add">
                    <button
                      className="favorites__item-add-cart"
                      type="button"
                      onClick={() => onAddItemToCart(product.id, userToken, product)}
                    >
                      <img
                        className={"favorites__item-add-cart-icon"}
                        src="https://res.cloudinary.com/dfinki0p4/image/upload/v1689177285/cart-logo_tz7wza.png"
                        alt="delete item from favorites"
                      />
                    </button>
                  </div>
                  <div className="favorites__item-remove">
                    <button
                      className={"favorites__item-remove-btn"}
                      onClick={() => handleRemoveFromFavorites(product._id, userToken)}
                      type="button"
                    >
                      <img
                        className={"favorites__item-remove-icon"}
                        src="https://res.cloudinary.com/dfinki0p4/image/upload/v1689177285/cart-trash-icon_mwntsr.png"
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
  );
};

export default FavoritesFull;