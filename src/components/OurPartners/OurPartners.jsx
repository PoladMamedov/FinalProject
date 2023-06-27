import { useState, useEffect } from "react";
import useServer from "../../hooks/useServer";

const OurPartners = () => {
   const server = useServer();
   const [partners, setPartners] = useState([]);
   useEffect(() => {
      async function fetchPartners() {
         try {
            const ourPartners = await server.getPartners();
            setPartners(ourPartners);
         } catch (error) {
            console.error(error);
         }
      }
      fetchPartners();
   }, []);
   return (
      <>
         <section className="our-partners">
            <h2 className="our-partners__title section-title">Our Partners</h2>
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