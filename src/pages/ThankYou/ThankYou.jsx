import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <section className="thankyou-section__wrapper">
      <div className="container">
        <div className="thankyou-section__title">
          <h1>Thank You for your order!</h1>
        </div>

        <div className="thankyou-section__text">
          <p>
            Your order#:&nbsp;
            <span className="thankyou-section__text-order-number">order#</span>
          </p>
          <p>Our manager will get back to you shortly.</p>

          <p>
            Please{" "}
            <Link to={"/about"} className="thankyou-section__text-link">
              contact us
            </Link>{" "}
            if you have any questions.
          </p>
          <p>
            Return to &nbsp;
            <Link to={"/"} className="thankyou-section__text-link">
              home page.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
