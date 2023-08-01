import React, { useState } from "react";
import UsersCabinet from "../UsersCabinet/UsersCabinet";
import OrdersList from "../../components/OrderList/OrderList";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

function UserDetails() {
  const [activeComponent, setActiveComponent] = useState("usersCabinet");

  const handleProfileButtonClick = () => {
    setActiveComponent("usersCabinet");
  };

  const handleMyOrdersButtonClick = () => {
    setActiveComponent("ordersList");
  };

  return (
    <div className="userdetails-section">
      <Breadcrumb/>
      <div className="container">
        <div className="userprofile-section-btn">
          <button
            className={`userprofile-section-btn-toggle ${
              activeComponent === "usersCabinet" ? "active" : ""
            }`}
            type="button"
            onClick={handleProfileButtonClick}
          >
            Profile
          </button>
          <button
            className={`userprofile-section-btn-toggle ${activeComponent === "ordersList" ? "active" : ""}`}
            type="button"
            onClick={handleMyOrdersButtonClick}
          >
            My orders
          </button>
        </div>

        {activeComponent === "usersCabinet" ? <UsersCabinet /> : <OrdersList />}
      </div>
    </div>
  );
}

export default UserDetails;

