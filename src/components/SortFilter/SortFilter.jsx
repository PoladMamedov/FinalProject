const SortFilter = (props) => {
    return (
        <div className="filter-section-sort" >
        <p>Sort by</p>
         <select
         className="filter-section-sort-select"
         onChange={props.change}
         defaultValue="low">
         <option value="1">Price(Low to High)</option>
         <option value="2">Price(High to Low)</option>
         </select>
        </div>
        
    );
};

export default SortFilter;
