import React, { useState, useEffect } from "react";
import UsersCabinet from "../UsersCabinet/UsersCabinet";
import OrdersList from "../../components/OrderList/OrderList";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

function UserAccount() {
  const [activeComponent, setActiveComponent] = useState(() => {
    return localStorage.getItem("activeComponent") || "account";
  });

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  const handleProfileButtonClick = () => {
    setActiveComponent("account");
  };

  const handleMyOrdersButtonClick = () => {
    setActiveComponent("ordersList");
  };


  return (
    <div className="userdetails-section">
      <Breadcrumb />
      <div className="container">
        <div className="useraccount-section-btn">
          <button
            className={`useraccount-section-btn-toggle ${
              activeComponent === "account" ? "active" : ""
            }`}
            type="button"
            onClick={handleProfileButtonClick}
          >
            My Account
          </button>
          <button
            className={`useraccount-section-btn-toggle ${
              activeComponent === "ordersList" ? "active" : ""
            }`}
            type="button"
            onClick={handleMyOrdersButtonClick}
          >
            My orders
          </button>
        </div>

        {activeComponent === "account" ? <UsersCabinet /> : <OrdersList />}
      </div>
    </div>
  );
}

export default UserAccount;


