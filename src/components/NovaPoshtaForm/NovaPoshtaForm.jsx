/* eslint-disable react/jsx-no-bind */
import { useState } from "react";
import useNovaPoshta from "../../hooks/useNovaPoshta";
import useDebounce from "../../hooks/useDebounce";
import NPSerachLoader from "./components/NPSearchLoader";
import NPSearchSuggestions from "./components/NPSearchSuggestions";

function NovaPoshtaForm() {
  const { findCity, findWarehouse } = useNovaPoshta();

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

  function resetForm() {
    setFullName("");
    setPhoneNumber("+380");
    setSearchedCity("");
    setSearchedWarehouse("");
  }

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

  return (
    <div className="container">
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
            const deliveryInfo = {
              fullName,
              phoneNumber,
              selectedCity,
              selectedWarehouse,
            };
            console.log(deliveryInfo);
            resetForm();
          }}
        >
          <label htmlFor="fullName">Full name:</label>
          <input
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Enter your full name"
          />
          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            placeholder=""
          />
          <label htmlFor="city">City:</label>
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
          <label htmlFor="warehouse">Warehouse:</label>
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
          <button className="np-delivery__btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NovaPoshtaForm;
