import { Link } from "react-router-dom";

function OrderItem({ product, cartQuantity }) {
  return (
    <li className="orders-section-sub-list-item">
        <Link
          className="orders-section-sub-list-item-img-wrap"
          to={`/products/${product.itemNo}`}
        >
          {" "}
          <img
            className="orders-section-sub-list-item-img"
            src={product.imageUrls[0]}
            alt="item-img"
          />
        </Link>
        <div className="orders-section-sub-list-item-details">
          <p className="orders-section-sub-list-item-details-name">
           {product.name}
          </p>
          <p className="orders-section-sub-list-item-details-qty">
            {cartQuantity} pcs
          </p>
          <p className="orders-section-sub-list-item-details-price">
            {product.currentPrice}
          </p>
        </div>
    </li>
  );
}

export default OrderItem;

