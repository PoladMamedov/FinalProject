/* eslint-disable no-confusing-arrow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import PreLoader from "../../components/PreLoader/PreLoader";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
// eslint-disable-next-line import/order
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line spaced-comment
//import { PatternFormat } from "react-number-format";

import {
  faAngleDown,
  faAngleUp,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function CheckOut() {
  //   const [isSummaryVisible, setSummaryVisible] = useState(true);

  //   const toggleSummaryVisibility = () => {
  //     setSummaryVisible((prevState) => !prevState);
  //     console.log(setSummaryVisible((prevState) => !prevState));
  //   };
  const [activeButton, setActiveButton] = useState(2);
  const [selectedMethod, setSelectedMethod] = useState({
    label: "Standart Shipping ",
    value: "13",
  });
  
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      appartment: "",
      city: "",
      phoneNumber: "",
      emailAddress: "",
      shippingMethod: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name required")
        .min(2, "Minimum length is 2 characters"),
      lastName: Yup.string()
        .required("Last Name required")
        .min(2, "Minimum length is 2 characters"),
      address: Yup.string()
        .required("Address required")
        .min(5, "Minimum length is 5 characters"),
      appartment: Yup.number().required("Appartment# required"),
      city: Yup.string()
        .required("City required")
        .min(2, "Minimum length is 2 characters"),
      phoneNumber: Yup.number()
        .required("Phone Number required")
        .min(10, "Minimum length is 10 characters"),
        // .transform((value) => (Number.isNaN(value) ? null : value))
        // .nullable(true),
      emailAddress: Yup.string()
        .required("Email Address required")
        .email(),
      shippingMethod: Yup.string()
        .required("Shipping method required")
        //  .oneOf(["Store Pick Up", "Standart Shipping"]),
    }),

    onSubmit: () => {
      // const userData = {
      //   loginOrEmail: values.loginOrEmail,
      //   password: values.password,
      // };
      <Navigate to={"/products"} />;
      console.log('click');
    },
  });
  return (
    <div>
      <Breadcrumb />
      <section className="checkout-section__wrapper">
        <div className="checkout-section__product-wrapper">
          <div className="checkout-section__product-header">
            {/* <div className="checkout-section__product-header-summary">
              <span className="checkout-section__product-qty">
                Your bag (1)
              </span>
              <span className="checkout-section__product-dropdown">
                <span className="checkout-section__product-show">
                  "Show order summary"
                  <span className="checkout-section__product-value">value</span>
                  <FontAwesomeIcon icon={faAngleDown} className="icon-arrow" />
                </span>
                <span className="checkout-section__product-hide">
                  "Hide order summary"
                  <span className="checkout-section__product-value">value</span>
                  <FontAwesomeIcon icon={faAngleUp} className="icon-arrow" />
                </span>
              </span>
            </div> */}

            <div className="checkout-section__product-header-summary">
              <span className="checkout-section__product-qty">
                Your bag (1)
              </span>

              <button
                className={`checkout-section__product ${
                  activeButton === 1 ? "active" : ""
                }`}
                onClick={() => handleButtonClick(1)}
              >
                "Show order summary"
                <FontAwesomeIcon icon={faAngleDown} className="icon-arrow" />
              </button>
              <button
                className={`checkout-section__product ${
                  activeButton === 2 ? "active" : ""
                }`}
                onClick={() => handleButtonClick(2)}
              >
                "Hide order summary"
                <FontAwesomeIcon icon={faAngleUp} className="icon-arrow" />
              </button>
            </div>

            <div
              className={`checkout-section__product-item-wrapper ${
                activeButton === 2 ? "active" : ""
              }`}
            >
              <span className="">item component</span>
            </div>
          </div>

          <div className="checkout-section__product-summary-computer">
            <h4 className="">Order summary</h4>
            <div className="checkout-section__product-summary-computer-subtotal">
              <span className="">Subtotal</span>
              <span className="">value</span>
            </div>
            <div className="checkout-section__product-summary-computer-shipping">
              <span className="">Shipping method</span>
            </div>
            <div className="checkout-section__product-summary-computer-shipping-method">
              <span className="">{selectedMethod.label}</span>
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
                    <a
                      href="/"
                      className="checkout-section__security-help-contact"
                    >
                      contact us
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          className="checkout-section__form"
          //   action="login"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="checkout-section__form-title">Shipping Details</h1>
          <div className="checkout-section__form-input-wrapper">
            <input
              className="checkout-section__form-input-field"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="First Name"
            />

            {formik.errors.firstName && formik.touched.firstName ? (
              <label className="checkout-section__form-input-error">
                {formik.errors.firstName}
              </label>
            ) : null}
          </div>

          <div className="checkout-section__form-input-wrapper">
            <input
              className="checkout-section__form-input-field"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Last Name"
            />

            {formik.errors.lastName && formik.touched.lastName ? (
              <label className="checkout-section__form-input-error">
                {formik.errors.lastName}
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
              type="number"
              name="appartment"
              value={formik.values.appartment}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Appartment#"
            />

            {formik.errors.appartment && formik.touched.appartment ? (
              <label className="checkout-section__form-input-error">
                {formik.errors.appartment}
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
            <select
              className="checkout-section__form-input-field select"
              type="text"
              name="shippingMethod"
              value={formik.values.shippingMethod}
              //   onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e);
                const selectedOption = e.target.options[e.target.selectedIndex];
                 const methodValue = selectedOption.value === "storePickUp" ? "Free" : "13";
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
                value="standartShipping"
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
            Continue to billing
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
                  <a
                    href="/"
                    className="checkout-section__security-help-contact"
                  >
                    contact us
                  </a>
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
