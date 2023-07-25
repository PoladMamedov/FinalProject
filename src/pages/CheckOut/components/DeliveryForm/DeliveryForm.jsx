import { useState } from "react";
import NovaPoshtaForm from "../NovaPoshtaForm/NovaPoshtaForm";
import StorePickUpForm from "../StorePickUpForm/StorePickUpForm";

function DeliveryForm() {
  const [isDelivery, setIsDelivery] = useState(true);

  return (
    <div className="checkout-section__form-wrapper">
      <h1 className="checkout-section__form-title">Shipping Details</h1>
      <div className="checkout-section__form-select">
        <button
          className={
            isDelivery
              ? "checkout-section__form-select-btn checkout-section__form-select-btn--active"
              : "checkout-section__form-select-btn"
          }
          type="button"
          onClick={() => setIsDelivery(true)}
        >
          Delivery
        </button>
        <button
          className={
            isDelivery
              ? "checkout-section__form-select-btn"
              : "checkout-section__form-select-btn checkout-section__form-select-btn--active"
          }
          type="button"
          onClick={() => setIsDelivery(false)}
        >
          Store Pickup
        </button>
      </div>
      {isDelivery ? <NovaPoshtaForm /> : <StorePickUpForm />}
    </div>
  );
}

export default DeliveryForm;
