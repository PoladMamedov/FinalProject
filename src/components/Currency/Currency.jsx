import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import setCurrency from "../../redux/actions/currency";

const Currency = () => {
   const dispatch = useDispatch();
   const [allCurrencies, setAllCurrencies] = useState([]);
   const [value, setValue] = useState("USD");
   const { rates } = allCurrencies;
   const values = ["USD", "UAH", "EUR", "PLN"];

   useEffect(() => {
      fetch("https://openexchangerates.org/api/latest.json?app_id=4474d46addfb4df889d59789952f542b")
         .then((response) => response.json())
         .then((data) => setAllCurrencies(data));
   }, [value]);

   useEffect(() => {
      if (rates && rates[value]) {
         dispatch(setCurrency(rates[value].toFixed(2), value));
      }
   }, [value, rates]);

   const handleChange = (e) => {
      setValue(e.target.value);
   };

   return (
      <>
         <img className="currency__icon" src="/img/currency/currency-icon.png" alt="" />
         <select className="currency" value={value} onChange={(e) => handleChange(e)} name="currency" id="currency">
            {values.map((val, index) => (
               <option key={index} value={val}>{val}</option>
            ))}
         </select>
         <img className="currency__img" src={`/img/currency/${value}.png`} alt="ere" />
      </>
   );

};
export default Currency;