import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import AllProductItems from "../../components/AllProductItems/AllProductItems";

const Search = () => {

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
