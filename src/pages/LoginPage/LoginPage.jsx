import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <section className="login-section">
      <form className="login-section__form" action="login">
        <h1 className="login-section__title">LOGIN</h1>
        <input className="login-section__form-input" type="text" name="email" />
        <input className="login-section__form-input" type="text" name="password" />
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
