import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/actions/orders";
import OrderItem from "../OrderItem/OrderItem";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import PaginationAllProducts from "../PaginationAllProducts/PaginationAllProducts";
import Skeleton from "./Skeleton";

function OrdersList() {
  const { orders, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.userInfo.token);

  const { currency, currencyName } = useSelector(
    (state) => state.currentCurrency
  );

  const currencyValue = parseFloat(currency);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [productsPerPage, setProductsPerPage] = useState(4);
  const totalPages = Math.ceil(orders.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newPaginatedProducts = orders.slice(startIndex, endIndex);
    setPaginatedProducts(newPaginatedProducts);
  }, [currentPage, orders, productsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateTimeString) => {
    return dayjs(dateTimeString).format("MMMM DD, YYYY, HH:mm:ss");
  };

  const [activeItemIds, setActiveItemIds] = useState([]);
  const toggleOrderItem = (orderId) => {
    // eslint-disable-next-line no-confusing-arrow
    setActiveItemIds((prevActiveItemIds) => prevActiveItemIds.includes(orderId)
        ? prevActiveItemIds.filter((id) => id !== orderId)
        : [...prevActiveItemIds, orderId] );
  };

  useEffect(() => {
    if (userToken) {
      dispatch(fetchOrders(userToken));
    }
  }, [userToken]);

  return (
    <section className="orders-section">
      {/* <div className="orders-section-title">
        <h2>Список заказов</h2>
      </div> */}
      <div className="container">
        {loading ? (
          <div className="skeleton__loader">
            <Skeleton />
          </div>
        ) : (
          <ul className="orders-section-main-list">
            {paginatedProducts.map((order) => (
              // eslint-disable-next-line no-underscore-dangle
              <li className="orders-section-main-list-item" key={order._id}>
                <div className="orders-section-main-list-item-content">
                  <div className="orders-section-main-list-item-content-order-number">
                    <p>Order#: {order.orderNo}</p>
                    <p>Date: {formatDate(order.date)}</p>
                  </div>

                  <div
                    className={`orders-section-main-list-item-content-total ${
                      // eslint-disable-next-line no-underscore-dangle
                      activeItemIds.includes(order._id) ? "active" : ""
                    }`}
                  >
                    <p>Total</p>
                    <div className="checkout-section__product-summary-computer-total-price">
                      <img
                        src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`}
                        alt="cureency-icon"
                      />
                      <span>
                        {Math.floor(`${order.totalSum * currencyValue}`)}
                      </span>
                    </div>
                  </div>
                  <button
                    className={`orders-section-main-list-btn ${
                      // eslint-disable-next-line no-underscore-dangle
                      activeItemIds.includes(order._id) ? "active" : ""
                    }`}
                    type="button"
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => toggleOrderItem(order._id)}
                  >
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="icon-arrow"
                    />
                  </button>
                  <button
                    className={`orders-section-main-list-btn ${
                      // eslint-disable-next-line no-underscore-dangle
                      !activeItemIds.includes(order._id) ? "active" : ""
                    }`}
                    type="button"
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => toggleOrderItem(order._id)}
                  >
                    <FontAwesomeIcon icon={faAngleUp} className="icon-arrow" />
                  </button>
                </div>

                <ul
                  className={`orders-section-sub-list ${
                    // eslint-disable-next-line no-underscore-dangle
                    activeItemIds.includes(order._id) ? "active" : ""
                  }`}
                >
                  <div className="orders-section-sub-list-total-wrap">
                    <div className="orders-section-sub-list-total-wrap-p total">
                      <span className="">Total</span>
                      <div className="checkout-section__product-summary-computer-total-price">
                        <img
                          src={`https://res.cloudinary.com/dfinki0p4/image/upload/v1689412937/currency/${currencyName}-icon.png`}
                          alt="cureency-icon"
                        />
                        <span>
                          {Math.floor(`${order.totalSum * currencyValue}`)}
                        </span>
                      </div>
                    </div>
                    <p className="orders-section-sub-list-total-wrap-p">
                      <span>Phone</span>
                      <span>{order.mobile}</span>
                    </p>
                    <p className="orders-section-sub-list-total-wrap-p">
                      <span>Shipping address </span>
                      <span>{`${order.deliveryAddress.address}, ${order.deliveryAddress.city} `}</span>
                    </p>
                  </div>

                  {order.products.map((product) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <OrderItem
                      // eslint-disable-next-line no-underscore-dangle
                      key={product._id}
                      product={product.product}
                      cartQuantity={product.cartQuantity}
                    />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <PaginationAllProducts
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default OrdersList;
