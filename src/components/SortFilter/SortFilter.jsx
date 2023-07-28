import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortLowToHighPrice, sortHighToLowPrice } from "../../redux/actions/sortFilter";
import { sortProducts } from "../../redux/actions/products";

const SortFilter = ( {products, isFilterCollapsed} ) => {
const dispatch = useDispatch();

useEffect(() => {
        dispatch(sortLowToHighPrice());
    }, []);

    function handleSelectChange(e) {
        if (products.length !== 0) {
            if (e.target.value === "1") {
                dispatch(sortLowToHighPrice());
                const sortHigh = products.sort((a, b) => a.currentPrice - b.currentPrice);
                dispatch(sortProducts(sortHigh));
            } else if (e.target.value === "2") {
                dispatch(sortHighToLowPrice());
                const sortLow = products.sort((a, b) => b.currentPrice - a.currentPrice);
                dispatch(sortProducts(sortLow));
            }
        }
    }

    return (
        <div className={`filter-section-sort ${isFilterCollapsed ? "filter-section-sort--position" : ""}`}>
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
