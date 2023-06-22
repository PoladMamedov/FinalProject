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
            <ul className="our-partners__list">
               {partners.length !== 0 ? partners.map(({ imageUrl, url }, index) => {
                  return (
                     <li className="our-partners__item" key={index}>
                        <a href={url} className="our-partners__link" target="blank">
                           <img className={`our-partners__logo${index === 3 ? "--last" : ""}`} src={imageUrl} alt="partner-logo" />
                        </a>
                     </li>
                  );
               }) : <p>loading</p>}
            </ul>
         </section>
      </>
   );
};
export default OurPartners;