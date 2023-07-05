import { NavLink } from "react-router-dom";
import setPagePath from "../../redux/actions/setPagePath";
import { useDispatch } from "react-redux";

const FoundProduct = ({
   name, imageUrls, currentPrice, previousPrice, itemNo, setIsSearchOpen
}) => {
   const dispatch = useDispatch();
   const handleLinkClick = () => {
      setIsSearchOpen(false);
      dispatch(setPagePath("product"));
   };
   return (
      <li className="searched-product">
         <img className="searched-product__photo" src={imageUrls[1]} alt="product_photo" />
         <div className="searched-product__description">
            <NavLink onClick={() => handleLinkClick()} className="searched-product__name" to={`/products/${itemNo}`}>
               {name}
            </NavLink >
            <div className="searched-product__prices-wrap">
               <p className="searched-product__price--curr">${currentPrice}</p>
               {currentPrice !== previousPrice && <p className="searched-product__price--prev">${previousPrice}</p>}
            </div>
         </div>
      </li >
   );
};
export default FoundProduct;