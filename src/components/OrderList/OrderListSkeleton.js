import { Link } from "react-router-dom";

const UserAccountSkeleton = () => {
  return (
    <div className={"orderlist__skeleton"}>
      <p className={"orderlist__skeleton-text"}>
        There are no recent orders to show!
      </p>
      <img
        className={"orderlist__skeleton-img"}
        src=""
        alt="orderlist is empty"
      />
      <p className={"orderlist__skeleton-text"}>
       Run to the e-store for great offers.
      </p>
      <Link className={"cart__skeleton-link"} to={"/products"}>
        Continue Shopping
      </Link>
    </div>
  );
};

export default UserAccountSkeleton;