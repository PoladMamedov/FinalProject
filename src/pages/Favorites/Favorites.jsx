/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useServer from "../../hooks/useServer";

const Favorites = ({ token }) => {
  const { wishlist, addToFavorites } = useServer();
  const [favorites, setFavorites] = useState(wishlist); // Хранение списка избранных товаров

  const handleAddToFavorites = async (productId) => {
    try {
      await addToFavorites({ itemNo: productId, token });
      console.log("Product added to favorites");

      // Обновление списка избранных товаров после успешного добавления
      setFavorites([...favorites, productId]);
    } catch (error) {
      console.error("Error adding product to favorites:", error);
    }
  };
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
        {wishlist && wishlist.map((product) => (
            <div className="favorites__item" key={product.itemNo}>
              <img
                className={"favorites__item-img"}
                src={product.imageUrls[0]}
                alt="item-img"
              />
              <div className="favorites__item-details">
                <p className="favorites__item-title">{product.name}</p>
                <p className="favorites__item-price">${product.currentPrice}</p>
                <div className="favorites__item-quantity">
                  <span className="favorites__item-quantity-no">0</span>
                </div>
                <div className="favorites__item-add">
                  <button
                    type="button"
                    className="favorites__item-add-minus"
                  >
                    -
                  </button>
                  <span className="favorites__item-add-number">0</span>
                  <button
                    type="button"
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

// import React, { useEffect, useState } from "react";
// import ProductCard from "../../components/ProductCard";

// const useWishlist = (customerId) => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const response = await fetch(`/wishlist/${customerId}`);
//         const data = await response.json();
//         setWishlist(data);
//       } catch (error) {
//         console.error('Error fetching wishlist:', error);
//       }
//     };

//     fetchWishlist();
//   }, [customerId]);

//   const addProductToWishlist = async (productId) => {
//     try {
//       const response = await fetch('/wishlist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           customerId,
//           products: [productId],
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setWishlist(data);
//       } else {
//         console.error('Error adding product to wishlist:', response.status);
//       }
//     } catch (error) {
//       console.error('Error adding product to wishlist:', error);
//     }
//   };

//   return {
//     wishlist,
//     addProductToWishlist,
//   };
// };

// const Favorites = ({ customerId }) => {
//   const { wishlist, addProductToWishlist } = useWishlist(customerId);

//   return (
//     <div>
//       <h2>Wishlist</h2>
//       <ul>
//         {wishlist.map((product) => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//       <button onClick={() => addToFavoriteHandler("product1")}>Add to Wishlist</button>
//     </div>
//   );
// };

// export default Favorites;
