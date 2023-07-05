import { useDispatch } from "react-redux";
import { sortLowToHighPrice, sortHighToLowPrice } from "../../redux/actions/sortFilter";
import {sortProducts} from "../../redux/actions/getProdicts";

const SortFilter = (props) => {

const dispatch = useDispatch();

function handleSelectChange(e) {
    if (props.products.length !== 0) {
        if (e.target.value === "1") {
            dispatch(sortLowToHighPrice());
            const sortHigh = props.products.sort((a, b) => a.currentPrice - b.currentPrice);
            dispatch(sortProducts(sortHigh))
        } else if (e.target.value === "2") {
            dispatch(sortHighToLowPrice());
          const sortLow = props.products.sort((a, b) => b.currentPrice - a.currentPrice);
          dispatch(sortProducts(sortLow))
        }
    } else if (props.products.length === 0) {
      if (e.target.value === "1") {
        dispatch(sortLowToHighPrice());
        console.log("Сюда добавить продукты выведенные по дефолту в порядке возрастания");
    } else if (e.target.value === "2") {
      dispatch(sortHighToLowPrice());
      console.log("Сюда добавить продукты выведенные по дефолту в порядке убывания");
    }
  }
  }
    return (
        <div className={`filter-section-sort ${props.isCollapsed ? "filter-section-sort--position" : ""}`}>
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
