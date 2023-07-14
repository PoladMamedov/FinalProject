import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "react-notifications-component";
import useServer from "../../../hooks/useServer";
import "react-notifications-component/dist/scss/notification.scss";
import "animate.css/animate.min.css";
import FavoritesIcon from "../../../components/FavoritesIcon/FavoritesIcon";
import OrderQuantity from "./OrderQuantity";
import { addToCart, fetchCart, setCart } from "../../../redux/actions/cart";

export default function OrderActions({
  properties: { color }, quantity, previousPrice, currentPrice, similarProducts, itemNo, _id: productID
}) {
  const {
    getWishlist, addToWishlist, deleteFromWishlist
} = useServer();

  const dispatch = useDispatch();

  const {userInfo: {token}} = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [productColor, setProductColor] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [favs, setFavs] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const colors = {...similarProducts, [itemNo]: color};
  const price = {currentPrice, previousPrice};

  async function fetchFavs(authToken) {
    try {
      const wishlist = await getWishlist(authToken);
      setFavs(wishlist);
      setIsFav(favs.length && favs.some(({_id}) => _id === productID));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setProductColor(color);
    if (token) {
      fetchFavs(token);
    }
  }, [color]);

  async function addToFavs() {
    try {
      setIsFav(true);
      console.log(productID);
      const wishlist = await addToWishlist(productID, token);
      setFavs(wishlist);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFromFavs() {
    try {
      setIsFav(false);
      const wishlist = await deleteFromWishlist(productID, token);
      setFavs(wishlist);
    } catch (error) {
      console.log(error);
    }
  }

  async function onAddButtonClick() {
      try {
        if (token) {
          dispatch(fetchCart(token));
          const productInCart = cart.find(({product: {_id: id}}) => id === productID);
          dispatch(setCart({
            products: [
              {
                product: productID,
                cartQuantity: productInCart ? orderQuantity + productInCart.cartQuantity : orderQuantity
              }
            ]
          }, token));
        } else {
          const productInCart = cart.find(({product}) => product === productID);
          dispatch(addToCart([
              {
                product: productID,
                cartQuantity: productInCart ? orderQuantity + productInCart.cartQuantity : orderQuantity
              }
            ]));
        }
        setOrderQuantity(1);

        Store.addNotification({
          title: "Success!",
          message: "Product added to cart",
          type: "success",
          insert: "bottom",
          container: "bottom-left",
          dismiss: {
            duration: 5000,
            showIcon: true
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

  return <div className="product-detail__order-actions">
    {currentPrice < previousPrice ? <div className="product-detail__price-wrap">{Object.entries(price).map(([key, value], index) => <p key={index} className={`product-detail__price product-detail__price-${key === "currentPrice" ? "current" : "previous"}`}>{value}$</p>)}</div> : <p className="product-detail__price">{currentPrice}$</p>}
    <div className="order-actions__btns-wrap">
      {isFav ? <FavoritesIcon color={"red"} className={"order-actions__favs-btn order-actions__favs-btn--fill"} isFill clickHandler={() => deleteFromFavs()}/>
        : <FavoritesIcon color={"red"} className={"order-actions__favs-btn"} clickHandler={() => addToFavs()}/>}
      <button type="button" className="order-actions__add-btn" onClick={onAddButtonClick}>Add to cart</button>
    </div>
    <div className="product-detail__color-wrap">
      <p className="product-detail__basic-spec">Color: <span className="product-detail__basic-spec-value">{productColor}</span></p>
      <div className="product-detail__color-list">
        {Object.entries(colors).map(([key, value], index) => <Link to={`/products/${key}`} key={index}><span className={`product-detail__color-list-item ${productColor === value ? "product-detail__color-list-item--active" : ""}`} style={{backgroundColor: value}}></span></Link>)}
      </div>
    </div>
    <OrderQuantity productQuantity={quantity} orderQuantity={orderQuantity} setOrderQuantity={setOrderQuantity}/>
  </div>;
}