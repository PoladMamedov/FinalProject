/* eslint-disable react/button-has-type */
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faAngleDown,
  faAngleUp,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import CartList from "../../components/CartList/CartList";
import { fetchCart } from "../../redux/actions/cart";
import CartSkeleton from "../Cart/components/CartSkeleton";
// import { PatternFormat } from "react-number-format";
import useServer from "../../hooks/useServer";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { placeOrder } = useServer();
  // eslint-disable-next-line no-unused-vars
  const [newOrder, setNewOrder] = useState({});
  const [activeButton, setActiveButton] = useState(2);
  const [selectedMethod, setSelectedMethod] = useState({
    label: "Standart Shipping",
    value: "13",
  });
  const userToken = useSelector((state) => state.user.userInfo.token);
  const cartQuantity = useSelector((state) => state.cart.cart);
  const cartProducts = useSelector((state) => state.cart.cart);

  const totalOrderPrice = cartProducts.reduce((accumulator, item) => {
    // eslint-disable-next-line no-shadow
    const { product, cartQuantity } = item;
    const productTotalPrice = product.currentPrice * cartQuantity;
    return accumulator + productTotalPrice;
  }, 0);
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  const currentDate = new Date();

  const {
    userInfo: { _id },
  } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (token) {
  //     console.log(customerNo);
  //     console.log(token);
  //     console.log(_id);
  //   }
  // }, [token, customerNo]);

  useEffect(() => {
    if (cartProducts.length === 0 && userToken) {
      dispatch(fetchCart(userToken));
    }
  }, [userToken]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      appartment: "",
      city: "",
      phoneNumber: "",
      emailAddress: "",
      shippingMethod: "sandartShipping",
    },
    validationSchema: Yup.object({
      emailAddress: Yup.string().required("Email Address required").email(),
      phoneNumber: Yup.number().required("Phone Number required"),
      // .min(10, "Minimum length is 10 characters"),
      // .transform((value) => (Number.isNaN(value) ? null : value))
      // .nullable(true),
      address: Yup.string()
        .required("Address required")
        .min(5, "Minimum length is 5 characters"),
      city: Yup.string()
        .required("City required")
        .min(2, "Minimum length is 2 characters"),
      shippingMethod: Yup.string(),
    }),

    onSubmit: async (values) => {
      const newOrderData = {
        customerId: _id,
        products: cartProducts,
        email: values.emailAddress,
        mobile: values.phoneNumber,
        letterSubject: "Thank you for order! You are welcome!",
        letterHtml:
          "<h1>Your order is placed. OrderNo is 023689452.</h1><p>{Other details about order in your HTML}</p>",
        deliveryAddress: { city: values.city, address: values.address },
        totalSum: totalOrderPrice,
        canceled: false,
        date: currentDate,
      };
      const response = await placeOrder(newOrderData);
      setNewOrder(response);
      console.log(response);
      console.log(newOrderData);
      navigate("/thankyou");
    },
  });
  return (
    <div>
      <Breadcrumb />
      <section className="checkout-section__wrapper">
        <div className="checkout-section__product-wrapper">
          <div className="checkout-section__product-header">
            <div className="checkout-section__product-header-summary">
              <span className="checkout-section__product-qty">
                Your bag &nbsp;
                {cartQuantity.length >= 1 ? (
                  <span className="">({cartQuantity.length})</span>
                ) : null}
              </span>
              <button
                className={`checkout-section__product-btn ${
                  activeButton === 1 ? "active" : ""
                }`}
                onClick={() => handleButtonClick(1)}
              >
                Show order summary &nbsp;
                <span className="">${totalOrderPrice}</span>
                <FontAwesomeIcon icon={faAngleDown} className="icon-arrow" />
              </button>
              <button
                className={`checkout-section__product-btn ${
                  activeButton === 2 ? "active" : ""
                }`}
                onClick={() => handleButtonClick(2)}
              >
                Hide order summary &nbsp;
                <span className="">${totalOrderPrice}</span>
                <FontAwesomeIcon icon={faAngleUp} className="icon-arrow" />
              </button>
            </div>
            <div
              className={`checkout-section__product-item-wrapper ${
                activeButton === 2 ? "active" : ""
              }`}
            >
              {/* <CartList /> */}
              {cartProducts.length !== 0 ? <CartList /> : <CartSkeleton />}
            </div>
          </div>
          <div className="checkout-section__product-summary-computer">
            <h4 className="">Order summary</h4>
            <div className="checkout-section__product-summary-computer-subtotal">
              <span className="">Subtotal</span>
              <span className="">${totalOrderPrice}</span>
            </div>
            <div className="checkout-section__product-summary-computer-shipping">
              <span className="">Shipping method</span>
            </div>
            <div className="checkout-section__product-summary-computer-shipping-method">
              <span className="">{selectedMethod.label.split(" $")[0]}</span>
              <span className="">{selectedMethod.value}</span>
            </div>

            <div className="checkout-section__product-summary-computer-total">
              <span className="">Estimated total</span>
              <span className="">value</span>
            </div>
          </div>
          <div className="computer-version">
            <div className="checkout-section__security">
              <div className="checkout-section__security-title">
                <p>
                  <span className="">
                    <FontAwesomeIcon icon={faLock} />
                    &nbsp; We care about your security
                  </span>
                </p>
                <div className="checkout-section__security-help">
                  <span className="">
                    Do you need help with your order? Give us a call at
                  </span>
                  <br />
                  <span className="checkout-section__security-help-cell">
                    +358295938
                  </span>{" "}
                  <span className="">
                    or{" "}
                    <Link
                      to={"/about"}
                      className="checkout-section__security-help-contact"
                    >
                      contact us
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="checkout-section__form" onSubmit={formik.handleSubmit}>
          <h1 className="checkout-section__form-title">Shipping Details</h1>
          <div className="checkout-section__form-input-wrapper">
            <input
              className="checkout-section__form-input-field"
              type="text"
              name="emailAddress"
              value={formik.values.emailAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Email Address"
            />

            {formik.errors.emailAddress && formik.touched.emailAddress ? (
              <label className="checkout-section__form-input-error">
                {formik.errors.emailAddress}
              </label>
            ) : null}
          </div>
          <div className="checkout-section__form-input-wrapper">
            <input
              className="checkout-section__form-input-field"
              type="tel"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="(XXX) XXX-XXXX"
            />

            {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
              <label className="checkout-section__form-input-error">
                {formik.errors.phoneNumber}
              </label>
            ) : null}
          </div>
          <div className="checkout-section__form-input-wrapper">
            <input
              className="checkout-section__form-input-field"
              type="text"
              name="address"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Address"
            />

            {formik.errors.address && formik.touched.address ? (
              <label className="checkout-section__form-input-error">
                {formik.errors.address}
              </label>
            ) : null}
          </div>
          <div className="checkout-section__form-input-wrapper">
            <input
              className="checkout-section__form-input-field"
              type="text"
              name="city"
              value={formik.values.city}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="City"
            />

            {formik.errors.city && formik.touched.city ? (
              <label className="login-section__form-input-error">
                {formik.errors.city}
              </label>
            ) : null}
          </div>
          <div className="checkout-section__form-input-wrapper">
            <select
              className="checkout-section__form-input-field select"
              type="text"
              name="shippingMethod"
              value={formik.values.shippingMethod}
              onChange={(e) => {
                formik.handleChange(e);
                const selectedOption = e.target.options[e.target.selectedIndex];
                // eslint-disable-next-line operator-linebreak
                const methodValue =
                  selectedOption.value === "storePickUp" ? "Free" : "13";
                setSelectedMethod({
                  label: selectedOption.text,
                  value: methodValue,
                });
              }}
              label="Select A Shipping Method"
              placeholder="Select A Shipping Method"
            >
              <option
                className="checkout-section__form-input-field option"
                value="sandartShipping"
              >
                Standart Shipping $13
              </option>
              <option
                className="checkout-section__form-input-field"
                value="storePickUp"
              >
                Store Pick Up
              </option>
            </select>
            {formik.errors.shippingMethod && formik.touched.shippingMethod ? (
              <label className="checkout-section__form-input-error">
                {formik.errors.shippingMethod}
              </label>
            ) : null}
          </div>
          <button className="checkout-section__form-submit-btn" type="submit">
            Continue
          </button>
        </form>
        <div className="mobile-version">
          <div className="checkout-section__security">
            <div className="checkout-section__security-title">
              <p>
                <span className="">
                  <FontAwesomeIcon icon={faLock} />
                  &nbsp; We care about your security
                </span>
              </p>
              <div className="checkout-section__security-help">
                <span className="">
                  Do you need help with your order? Give us a call at
                </span>
                <br />
                <span className="checkout-section__security-help-cell">
                  +358295938
                </span>{" "}
                <span className="">
                  or{" "}
                  <Link
                    to={"/about"}
                    className="checkout-section__security-help-contact"
                  >
                    contact us
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckOut;
