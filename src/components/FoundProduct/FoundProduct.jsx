import { NavLink } from "react-router-dom";

const FoundProduct = ({
   name, imageUrls, currentPrice, previousPrice, itemNo
}) => {
   return (
      <li className="searched-product">
         <img className="searched-product__photo" src={imageUrls[1]} alt="product_photo" />
         <div className="searched-product__description">
            <NavLink className="searched-product__name" to={`/products/${itemNo}`}>
               {name}
            </NavLink >
            <div className="searched-product__prices-wrap">
               <p className="searched-product__price--curr">${currentPrice}</p>
               <p className="searched-product__price--prev">${previousPrice}</p>
            </div>

         </div>
      </li >
   );
};
export default FoundProduct;