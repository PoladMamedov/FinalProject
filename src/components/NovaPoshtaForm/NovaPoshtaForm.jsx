import { useState } from "react";
import useNovaPoshta from "../../hooks/useNovaPoshta";
import useDebounce from "../../hooks/useDebounce";

function NovaPoshtaForm() {
  const { findCity, findWarehouse } = useNovaPoshta();

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

  // function debounce(fn, delay = 1000) {
  //   let timeout;
  //   return (...args) => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       fn(...args);
  //     }, delay);
  //   };
  // }

  async function handleCitySearch(value) {
    console.log("request sended");
    const searchResult = await findCity(value);
    setCitySearchResult(searchResult);
  }
  useDebounce(() => handleCitySearch(searchedCity), 1000, [searchedCity]);

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
              onInput={
                (e) => {
                  if (e.target.value === "") {
                    setSelectedCity("");
                    setSearchedWarehouse("");
                  }
                  setSearchedCity(e.target.value);
                  // debouncedCitySearch(e);
                }
                // async (e) => {
                // if (e.target.value === "") {
                //   setSelectedCity("");
                //   setSearchedWarehouse("");
                // }
                // setSearchedCity(e.target.value);
                // const searchResult = await findCity(e.target.value);
                // setCitySearchResult(searchResult);
              }
              onFocus={async (e) => {
                const searchResult = await findCity(e.target.value);
                setCitySearchResult(searchResult);
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
            {showCitySuggestions ? (
              <ul className="np-delivery__suggestions">
                {citySearchResult.map((elem) => {
                  return (
                    <li
                      className="np-delivery__suggestions-item"
                      key={elem.CityID}
                      onClick={() => {
                        setSearchedCity(elem.Description);
                        setSelectedCity(elem.Description);
                        setSearchedWarehouse("");
                        setShowCitySuggestions(false);
                      }}
                    >
                      {elem.Description}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <label htmlFor="warehouse">Warehouse:</label>
          <div className="np-delivery__input-wrap">
            <input
              disabled={!selectedCity}
              onInput={async (e) => {
                setSearchedWarehouse(e.target.value);
                const searchResult = await findWarehouse(e.target.value, selectedCity);
                setWarehouseSearchResult(searchResult);
              }}
              onFocus={async (e) => {
                const searchResult = await findWarehouse(e.target.value, selectedCity);
                setWarehouseSearchResult(searchResult);
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
            {showWarehouseSuggestions ? (
              <ul className="np-delivery__suggestions">
                {warehouseSearchResult.map((elem) => {
                  return (
                    <li
                      className="np-delivery__suggestions-item"
                      key={elem.Number}
                      onClick={() => {
                        setSearchedWarehouse(elem.Description);
                        setSelectedWarehouse(elem.Description);
                        setShowWarehouseSuggestions(false);
                      }}
                    >
                      {elem.Description}
                    </li>
                  );
                })}
              </ul>
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
