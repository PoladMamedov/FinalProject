import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import useServer from "../../../../hooks/useServer";

function StorePickUpForm() {
  const { placeOrder } = useServer();

  // const navigate = useNavigate();
  const {
    userInfo: { _id, token },
  } = useSelector((state) => state.user);

  // const cartProducts = useSelector((state) => state.cart.cart);

  // const totalOrderPrice = cartProducts.reduce((accumulator, item) => {
  //   const { product, cartQuantity } = item;
  //   const productTotalPrice = product.currentPrice * cartQuantity;
  //   return accumulator + productTotalPrice;
  // }, 0);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      appartment: "",
      city: "",
      phoneNumber: "+380",
      emailAddress: "",
    },
    validationSchema: Yup.object({
      emailAddress: Yup.string().required("Email Address required").email(),
      phoneNumber: Yup.number().required("Phone Number required"),
      address: Yup.string().required("Address required").min(5, "Minimum length is 5 characters"),
      city: Yup.string().required("City required").min(2, "Minimum length is 2 characters"),
    }),

    onSubmit: async (values) => {
      // products: cartProducts,
      const newOrderData = {
        customerId: _id,
        deliveryAddress: { city: values.city, address: values.address },
        email: values.emailAddress,
        mobile: values.phoneNumber,
        letterSubject: "Thank you for order! You are welcome!",
        letterHtml:
          "<h1>Your order is placed. OrderNo is 023689452.</h1><p>{Other details about order in your HTML}</p>",
        canceled: false,
        date: new Date(),
      };
      const res = await placeOrder(newOrderData, token);
      console.log(res);
      // navigate("/thankyou");
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
    </form>
  );
}

export default StorePickUpForm;
