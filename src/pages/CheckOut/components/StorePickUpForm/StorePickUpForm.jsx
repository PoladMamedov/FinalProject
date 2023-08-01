import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeEntireCart } from "../../../../redux/actions/cart";
import useServer from "../../../../hooks/useServer";
import createOrder from "../../functions/createOrder";
import PreLoader from "../../../../components/PreLoader/PreLoader";

function StorePickUpForm() {
  const { placeOrder, deleteCart } = useServer();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userInfo: { _id, token },
  } = useSelector((state) => state.user);
  const cartProducts = useSelector((state) => state.cart.cart);

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      phoneNumber: "+380",
      city: "",
      address: "",
    },
    validationSchema: Yup.object({
      emailAddress: Yup.string().required("Email Address required").email(),
      phoneNumber: Yup.number().required("Phone Number required"),
      address: Yup.string().required("Address required").min(5, "Minimum length is 5 characters"),
      city: Yup.string().required("City required").min(2, "Minimum length is 2 characters"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      const newOrderInfo = {
        customerId: _id,
        products: cartProducts,
        deliveryAddress: { city: values.city, address: values.address },
        email: values.emailAddress,
        mobile: values.phoneNumber,
        delivery: false,
      };
      const orderData = createOrder(newOrderInfo);
      await placeOrder(orderData, token);
      await deleteCart(token);
      dispatch(removeEntireCart());
      setLoading(false);
      navigate("/thankyou");
    },
  });
  return (
    <form className="checkout-section__form" onSubmit={formik.handleSubmit}>
      <div className="checkout-section__form-input-wrapper">
        <input
          className="checkout-section__form-input-field"
          type="text"
          name="emailAddress"
          value={formik.values.emailAddress}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Email"
        />

        {formik.errors.emailAddress && formik.touched.emailAddress ? (
          <label className="checkout-section__form-input-error">{formik.errors.emailAddress}</label>
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
          placeholder="+380"
        />

        {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
          <label className="checkout-section__form-input-error">{formik.errors.phoneNumber}</label>
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
          <label className="login-section__form-input-error">{formik.errors.city}</label>
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
          <label className="checkout-section__form-input-error">{formik.errors.address}</label>
        ) : null}
      </div>
      <button className="checkout-section__form-submit-btn" type="submit">
        Submit
      </button>
      {loading ? <PreLoader fillScreen /> : null}
    </form>
  );
}

export default StorePickUpForm;
