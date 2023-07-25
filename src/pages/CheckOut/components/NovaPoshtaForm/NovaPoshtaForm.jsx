/* eslint-disable react/jsx-no-bind */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useNovaPoshta from "../../../../hooks/useNovaPoshta";
import useDebounce from "../../../../hooks/useDebounce";
import NPSerachLoader from "./components/NPSearchLoader";
import NPSearchSuggestions from "./components/NPSearchSuggestions";

function NovaPoshtaForm() {
  const { findCity, findWarehouse } = useNovaPoshta();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+380");

  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [citySearchResult, setCitySearchResult] = useState([]);
  const [searchedCity, setSearchedCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [showWarehouseSuggestions, setShowWarehouseSuggestions] = useState(false);
  const [warehouseSearchResult, setWarehouseSearchResult] = useState([]);
  const [searchedWarehouse, setSearchedWarehouse] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  async function handleCitySearch(value) {
    setLoading(true);
    const searchResult = await findCity(value);
    setCitySearchResult(searchResult);
    setLoading(false);
  }
  useDebounce(() => handleCitySearch(searchedCity), 500, [searchedCity]);

  function handleCitySelect(city) {
    setSearchedCity(city);
    setSelectedCity(city);
    setSearchedWarehouse("");
    setShowCitySuggestions(false);
  }

  async function handleWarehouseSearch(value) {
    setLoading(true);
    const searchResult = await findWarehouse(value, selectedCity);
    setWarehouseSearchResult(searchResult);
    setLoading(false);
  }
  useDebounce(() => handleWarehouseSearch(searchedWarehouse), 500, [searchedWarehouse]);

  function handleWarehouseSelect(warehouse) {
    setSearchedWarehouse(warehouse);
    setSelectedWarehouse(warehouse);
    setShowWarehouseSuggestions(false);
  }

  const {
    userInfo: { _id, email },
  } = useSelector((state) => state.user);

  const cartProducts = useSelector((state) => state.cart.cart);

  const totalOrderPrice = cartProducts.reduce((accumulator, item) => {
    const { product, cartQuantity } = item;
    const productTotalPrice = product.currentPrice * cartQuantity;
    return accumulator + productTotalPrice;
  }, 0);

  function handleSubmit() {
    if (fullName === "" || phoneNumber === "" || selectedCity === "" || selectedWarehouse === "") return;
    const newOrderData = {
      customerId: _id || "customer unauthorized",
      products: cartProducts,
      email: email || "no email",
      mobile: phoneNumber,
      letterSubject: "Thank you for order! You are welcome!",
      letterHtml: "<h1>Your order is placed. OrderNo is 023689452.</h1><p>{Other details about order in your HTML}</p>",
      deliveryAddress: { city: selectedCity, address: selectedWarehouse },
      totalSum: totalOrderPrice,
      canceled: false,
      date: new Date(),
    };
    console.log(newOrderData);
    navigate("/thankyou");
  }

  return (
    <div className="np-delivery">
      <h3 className="np-delivery__title">
        <img width={50} height={50} src="./img/nova-poshta/np.png" alt="" />
        Nova Poshta delivery information:
      </h3>
      <form
        action="delivery"
        className="np-delivery__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          type="text"
          id="fullName"
          value={fullName}
          placeholder="Enter your full name"
        />
        <input
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          placeholder="+380"
        />
        <div className="np-delivery__input-wrap">
          <input
            onInput={(e) => {
              if (e.target.value === "") {
                setSelectedCity("");
                setSearchedWarehouse("");
              }
              setSearchedCity(e.target.value);
            }}
            onFocus={async (e) => {
              handleCitySearch(e.target.value);
              setShowCitySuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setShowCitySuggestions(false);
              }, 100);
            }}
            type="text"
            id="city"
            value={searchedCity}
            placeholder="Search for your city"
          />

          {showCitySuggestions && loading ? <NPSerachLoader /> : null}
          {showCitySuggestions && !loading ? (
            <NPSearchSuggestions searchResultArray={citySearchResult} selectHandler={handleCitySelect} />
          ) : null}
        </div>
        <div className="np-delivery__input-wrap">
          <input
            disabled={!selectedCity}
            onInput={async (e) => {
              setSearchedWarehouse(e.target.value);
            }}
            onFocus={async (e) => {
              handleWarehouseSearch(e.target.value, selectedCity);
              setShowWarehouseSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setShowWarehouseSuggestions(false);
              }, 100);
            }}
            type="text"
            id="warehouse"
            value={searchedWarehouse}
            placeholder="Find your warehouse"
          />
          {showWarehouseSuggestions && loading ? <NPSerachLoader /> : null}
          {showWarehouseSuggestions && !loading ? (
            <NPSearchSuggestions searchResultArray={warehouseSearchResult} selectHandler={handleWarehouseSelect} />
          ) : null}
        </div>
        <button className="checkout-section__form-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NovaPoshtaForm;
