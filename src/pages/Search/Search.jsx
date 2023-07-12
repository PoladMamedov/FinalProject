// import { useSelector } from "react-redux";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import AllProductItems from "../../components/AllProductItems/AllProductItems";

const Search = () => {
   // const { searchResults } = useSelector((state) => state.search);
   // const isCardView = useSelector((state) => state.toggleCard.cardView);
   return (
      <section>
         <div className="container">
            <Breadcrumb />
            <div className="products-section">
               <AllProductItems />
            </div>
         </div>
      </section>
   );
};

export default Search;
