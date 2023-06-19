import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("You need to enter valid email").required("You need to enter your email to continue"),
      password: Yup.string().required("Password required"),
    }),
    // onSubmit: (values) => {

    //   //! запрос на сервер и получение ответа (токена). Authorized or not
    //   // console.log({ email: values.email, password: values.password });

    // },
  });

  return (
    <section className="login-section">
      <img width={500} height={520} src="./img/loginPageImage.jpg" alt="login-page-img" />
      <form className="login-section__form" action="login" onSubmit={formik.handleSubmit}>
        <h1 className="login-section__title">LOGIN</h1>
        <div className="login-section__form-input-wrapper">
          <input
            className="login-section__form-input"
            type="text"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.6884 18.2135V16.5322C17.6884 15.6404 17.3341 14.7851 16.7035 14.1545C16.0729 13.5239 15.2176 13.1697 14.3258 13.1697H7.6008C6.70901 13.1697 5.85374 13.5239 5.22314 14.1545C4.59255 14.7851 4.23828 15.6404 4.23828 16.5322V18.2135"
              stroke="#878484"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.9634 9.80732C12.8204 9.80732 14.3259 8.30187 14.3259 6.4448C14.3259 4.58773 12.8204 3.08228 10.9634 3.08228C9.10628 3.08228 7.60083 4.58773 7.60083 6.4448C7.60083 8.30187 9.10628 9.80732 10.9634 9.80732Z"
              stroke="#878484"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {formik.errors.email && formik.touched.email ? (
            <label className="login-section__form-input-error">{formik.errors.email}</label>
          ) : null}
        </div>
        <div className="login-section__form-input-wrapper">
          <input
            className="login-section__form-input"
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.2101 10.1172H4.44127C3.51274 10.1172 2.76001 10.8699 2.76001 11.7984V17.6829C2.76001 18.6114 3.51274 19.3641 4.44127 19.3641H16.2101C17.1386 19.3641 17.8914 18.6114 17.8914 17.6829V11.7984C17.8914 10.8699 17.1386 10.1172 16.2101 10.1172Z"
              stroke="#878484"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.12256 10.1172V6.75467C6.12256 5.63992 6.56539 4.57083 7.35363 3.78259C8.14188 2.99434 9.21097 2.55151 10.3257 2.55151C11.4405 2.55151 12.5095 2.99434 13.2978 3.78259C14.086 4.57083 14.5289 5.63992 14.5289 6.75467V10.1172"
              stroke="#878484"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {formik.errors.password && formik.touched.password ? (
            <label className="login-section__form-input-error">{formik.errors.password}</label>
          ) : null}
        </div>
        <button className="login-section__form-submit-btn" type="submit">
          LOGIN
        </button>
        <p className="login-section__message">
          Need an account? <Link to={"/registration"}>Sign up now!</Link>
        </p>
      </form>
    </section>
  );
}

export default LoginPage;
