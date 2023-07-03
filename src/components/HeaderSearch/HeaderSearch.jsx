import { useEffect, useState } from "react";
import useServer from "../../hooks/useServer";

const HeaderSearch = ({ searchTerm }) => {
   const [findProducts, setFindProducts] = useState([]);
   const { getSearchedProducts } = useServer();
   const searchPhrases = {
      query: searchTerm
   };
   useEffect(() => {
      async function searchProducts() {
         try {
            const products = await getSearchedProducts(searchPhrases);
            setFindProducts(products);
         } catch (error) {
            console.error(error);
         }
      }
      if (searchTerm !== "") {
         searchProducts();
      }
   }, [searchTerm]);

   return (
      searchTerm !== "" && <div className="products">
         {findProducts.length !== 0 && findProducts.map(({ name, itemNo }) => {
            return (
               <p key={itemNo} className="searched-name">{name}</p>
            );
         })}
      </div>
   );
};

export default HeaderSearch;