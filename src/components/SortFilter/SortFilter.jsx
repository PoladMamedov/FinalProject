import { useDispatch, useSelector } from "react-redux";
import { sortLowToHighPrice, sortHighToLowPrice } from "../../redux/actions/sortFilter";

const SortFilter = () => {

const dispatch = useDispatch();

const { filteredProducts } =  useSelector((state) => state.filteredProducts);


function handleSelectChange(e) {
  if (filteredProducts && filteredProducts.products) {
      if (e.target.value === "1") {
          dispatch(sortHighToLowPrice());
          filteredProducts.products.sort((a, b) => b.currentPrice - a.currentPrice);
      } else if (e.target.value === "2") {
          dispatch(sortLowToHighPrice());
          filteredProducts.products.sort((a, b) => a.currentPrice - b.currentPrice);
      }
  } else {
    if (e.target.value === "1") {
      dispatch(sortHighToLowPrice());
  } else if (e.target.value === "2") {
      dispatch(sortLowToHighPrice());
  }
    console.log("Сюда добавить продукты выведенные по дефолту");
  }
}

    return (
        <div className="filter-section-sort">
        <p className="filter-section-sort-text">Sort by</p>
         <select
         className="filter-section-sort-select"
         onChange={handleSelectChange}>
         <option value="1">Price(Low to High)</option>
         <option value="2">Price(High to Low)</option>
         </select>
        </div>
        
    );
};

export default SortFilter;
