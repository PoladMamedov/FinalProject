import { useState, useEffect } from "react";
import "./ourPartners.scss";


const OurPartners = () => {
   const [partners, setPartners] = useState([]);
   useEffect(() => {
      fetch("https://final-project-backend-phi.vercel.app/api/partners")
         .then((response) => {
            response.json().then((data) => setPartners(data));
         });
   }, [partners]);
   return (
      <>
         <section className="our-partners">
            <h2 className="our-partners__title">OUR PARTNERS</h2>
            <ul>
               {partners.length !== 0 ? partners.map(({ name }, index) => {
                  return (
                     <li key={index}>{name}</li>
                  );
               }) : <p>loading</p>}
            </ul>
         </section>
      </>
   );
};
export default OurPartners;