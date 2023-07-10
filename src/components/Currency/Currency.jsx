import { useEffect, useState } from "react";

const Currency = () => {
   const [allCurrencies, setAllCurrencies] = useState([]);
   const [value, setValue] = useState("UAH");
   const [currencyValue, setCurrencyValue] = useState(null);
   const { rates } = allCurrencies;
   const values = ["UAH", "EUR", "PLN"];

   useEffect(() => {
      fetch("https://openexchangerates.org/api/latest.json?app_id=4474d46addfb4df889d59789952f542b")
         .then((response) => response.json())
         .then((data) => setAllCurrencies(data));
   }, [value]);

   useEffect(() => {
      if (rates && rates[value]) {
         setCurrencyValue(rates[value].toFixed(2));
      }
   }, [value, rates]);

   const handleChange = (e) => {
      setValue(e.target.value);
   };

   return (
      <>
         <p>1$ =</p>
         <p className="currency__price">{rates ? currencyValue : <div>***</div>}</p>
         <select className="currency" value={value} onChange={(e) => handleChange(e)} name="currency" id="currency">
            {values.map((val, index) => (
               <option key={index} value={val}>{val}</option>
            ))}
         </select>
         <img className="currency__img" src={`./img/currency/${value}.png`} alt="ere" />
      </>
   );

};
export default Currency;