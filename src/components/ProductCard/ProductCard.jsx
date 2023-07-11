/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// // import unlikeIcon from "../../pages/Favorites/unlike_icon3.png";
// // import likeIcon from "../../pages/Favorites/like_icon4.png";

// export default function ProductCard(props) {
//   const [urlImg] = useState(props.item.imageUrls[0]);
//   const [urlItemNumber] = useState(props.item.itemNo);

//   return (
//     <>
//       {props.isCardView
//         ? <div className={props.active ? "all-card-container" : "card-container"}>
//           <div className={props.active ? "all-card" : "card"} style={{ backgroundImage: `url(${urlImg})` }}>
//             <div className={props.active ? "all-card__btn" : "card__btn"}>
//           {/* favorites section button */}
//             <div className="all-card__like">
//             <img className={props.active ? "all-card__like-btn" : "all-card__like-img"} src="/img/unlike_icon3.png" alt="unlike-icon" />
//             </div>
//             {/*  */}
//               <Link
//                 className={props.active ? "all-card__btn-details" : "card__btn-details"}
//                 to={`/products/${urlItemNumber}`}>DETAIL</Link>
//               <button
//                 type={"button"}
//                 className={props.active ? "all-card__btn-card-container" : "card__btn-card-container"}>
//                 <img
//                   className={props.active ? "all-card__btn-svg-cart" : "card__btn-svg-cart"}
//                   src="/img/cart-logo.png"
//                   alt="cart-logo"/>
//               </button>
//             </div>
//           </div>
//           <div className={props.active ? "all-card__block" : "unactive"}>
//             <div className={"all-card__product-name"}>{props.item.name}</div>
//             {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap">
//               <p className="all-card__price--prev">${props.item.previousPrice}</p>
//               <p className="all-card__price--curr">${props.item.currentPrice}</p>
//             </div> : <div className={"all-card__price--curr"}>${props.item.currentPrice}</div>}
//           </div>
//         </div>
//         : <div className={props.active ? "all-card-container__rows" : "card-container"}>
//           <div className={props.active ? "all-card__rows" : "card"} style={{ backgroundImage: `url(${urlImg})` }}>
//             <div className={props.active ? "all-card__btn--rows" : "card__btn"}>
//               {/* favorites section button */}
//           <div className="all-card__like">
//             <img className={props.active ? "all-card__like-btn" : "all-card__like-img"} src="/img/unlike_icon3.png" alt="unlike-icon" />
//             </div>
//             {/*  */}
//               <Link
//                 className={props.active ? "all-card__btn-details--rows" : "card__btn-details"}
//                 to={`/products/${urlItemNumber}`}>DETAIL</Link>
//               <button
//                 type={"button"}
//                 className={props.active ? "all-card__btn-card-container--rows" : "card__btn-card-container"}>
//                 <img
//                   className={props.active ? "all-card__btn-svg-cart--rows" : "card__btn-svg-cart"}
//                   src="/img/cart-logo.png"
//                   alt="cart-logo"/>
//               </button>
//             </div>
//           </div>
//           <div className={props.active ? "all-card__block--rows" : "unactive"}>
//             <div className={"all-card__product-name--rows"}>{props.item.name}</div>
//             {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap--rows">
//               <p className="all-card__price--prev">${props.item.previousPrice}</p>
//               <p className="all-card__price--curr-rows">${props.item.currentPrice}</p>
//             </div> : <div className={"all-card__price--curr-rows"}>${props.item.currentPrice}</div>}
//           </div>
//         </div>}
//     </>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);
  const { currency, currencyName } = useSelector((state) => state.currentCurrency);
  const currencyValue = parseFloat(currency);

  // const handleAddToFavorites = async () => {
  //   try {
  //     await addToFavorites({ itemNo: props.item.itemNo, token: props.item.customerId });
  //     console.log("Product added to favorites");
  //     setIsFavorited(true); // Обновляем значение isFavorited после успешного добавления в избранное
  //     // Выполните дополнительные действия после добавления в избранное
  //   } catch (error) {
  //     console.error("Error adding product to favorites:", error);
  //   }
  // };
  
  return (
    <>
      {props.isCardView ? (
        <div className={props.active ? "all-card-container" : "card-container"}>
          <div
            className={props.active ? "all-card" : "card"}
            style={{ backgroundImage: `url(${urlImg})` }}
          >
            <div className={props.active ? "all-card__btn" : "card__btn"}>
              <div className="all-card__like">
                {/* <img
                  className={props.active ? "all-card__like-btn" : "all-card__like-img"}
                  src={isFavorited ? likeIcon : unlikeIcon}
                  alt="like-icon"
                  onClick={handleAddToFavorites}
                /> */}
              </div>
              <Link
                className={props.active ? "all-card__btn-details" : "card__btn-details"}
                to={`/products/${urlItemNumber}`}
              >
                DETAIL
              </Link>
              <button
                type="button"
                className={props.active ? "all-card__btn-card-container" : "card__btn-card-container"}
              >
                <img
                  className={props.active ? "all-card__btn-svg-cart" : "card__btn-svg-cart"}
                  src="/img/cart-logo.png"
                  alt="cart-logo" />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block" : "unactive"}>
            <div className={"all-card__product-name"}>{props.item.name}</div>
            {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap">
              <p className="all-card__price--prev">
                <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr">
                <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.currentPrice * currencyValue)}</p>
            </div> : <div className={"all-card__price--curr"}>
              <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
              {Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>
      ) : (
        <div className={props.active ? "all-card-container__rows" : "card-container"}>
          <div
            className={props.active ? "all-card__rows" : "card"}
            style={{ backgroundImage: `url(${urlImg})` }}
          >
            <div className={props.active ? "all-card__btn--rows" : "card__btn"}>
              <div className="all-card__like">
                {/* <img
                  className={props.active ? "all-card__like-btn" : "all-card__like-img"}
                  src={isFavorited ? likeIcon : unlikeIcon}
                  alt="like-icon"
                  onClick={handleAddToFavorites}
                /> */}
              </div>
              <Link
                className={props.active ? "all-card__btn-details--rows" : "card__btn-details"}
                to={`/products/${urlItemNumber}`}
              >
                DETAIL
              </Link>
              <button
                type="button"
                className={
                  props.active ? "all-card__btn-card-container--rows" : "card__btn-card-container"
                }
              >
                <img
                  className={props.active ? "all-card__btn-svg-cart--rows" : "card__btn-svg-cart"}
                  src="/img/cart-logo.png"
                  alt="cart-logo" />
              </button>
            </div>
          </div>
          <div className={props.active ? "all-card__block--rows" : "unactive"}>
            <div className={"all-card__product-name--rows"}>{props.item.name}</div>
            {(props.item.previousPrice - props.item.currentPrice !== 0) ? <div className="all-card__prices-wrap--rows">
              <p className="all-card__price--prev">
                <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.previousPrice * currencyValue)}</p>
              <p className="all-card__price--curr-rows">
                <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
                {Math.floor(props.item.currentPrice * currencyValue)}</p>

            </div> : <div className={"all-card__price--curr-rows"}>
              <img className="currency-icon" src={`./img/currency/${currencyName}-icon.png`} alt="cureency-icon" />
              {Math.floor(props.item.currentPrice * currencyValue)}</div>}
          </div>
        </div>
      )}
    </>
  );
}

