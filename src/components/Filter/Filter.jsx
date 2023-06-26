/* eslint-disable react-hooks/exhaustive-deps */
import "./filter.scss";
import React, {useState, useEffect, forwardRef} from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchCategories } from "../../redux/actions/categories";
import useServer from "../../hooks/useServer";


const Filter = forwardRef((props, ref) => {
  const server = useServer();
  const [filters, setFilters] = useState([]);


  const [valuesPrice, setValuesPrice] = useState({
    Max: "",
    Min: "",
  });

  useEffect(() => {
    async function fetchFilters() {
      try {
        const filterResponse = await server.getFilters();
        setFilters(filterResponse);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFilters();
  }, []);

    const dispatch = useDispatch();
    const {categories} = useSelector(
        (state) => state.categories
      );

      useEffect(() => {
        dispatch(fetchCategories());
      }, [dispatch]);
  
  // для cохранения значений инпутов в стейте, чтобы потом сбросить фильтр
  function handleSetValue(e) {
    const { name, value } = e.target;
    const intValue = parseInt(value, 10);
    if (!Number.isNaN(intValue) && intValue >= 0) {
      setValuesPrice((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setValuesPrice((prevState) => ({ ...prevState, Max: "0", Min: "0" }));
    }
    
}

// для очищения инпутов
function resetBtnClick() {
  setValuesPrice((prevState) => ({ ...prevState, Max: "", Min: "" }));
}

    return (
      <>
        <div className="filter-section">
        <div className="filter-section-full" ref={ref}>
        <h3 className="filter-section__title">Filter</h3>
            <svg onClick={props.toggle} className="filter-section-btn-close" width={25} height={25} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="close"><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.7,14.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-2.3,2.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3L8.3,9.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.3,2.3l2.3-2.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12L15.7,14.3z"></path></svg>
            <div className="filter-section-container">
                <h4 className="filter-section__subtitle">Product Category</h4>
                 <form className="filter-section-list">
                 {
                    categories
                    .filter((item) => item.level === 0)
                    .map((item) => (
                    <div key={item.name} className="filter-section-list__item">
                    <label htmlFor={item.name}>{item.name}</label>
                    <input id={item.name} name={item.name} type="checkbox" onClick={props.addCounter} className="filter-section-list__item-checkbox"></input>
                    </div>))
                 }
                 </form>
             <h4 className="filter-section__subtitle">Price range</h4>
             <form className="filter-section-inputs">
                 {
                  filters.length !== 0 ? filters.map(({type, name}, idx) => (
                      <input
                      key={idx}
                      className={"filter-section-inputs__item"}
                      placeholder={name}
                      name={name}
                      type={type}
                      step="1"
                      min="0"
                      value={name === "Max" ? valuesPrice.Max : valuesPrice.Min}
                      onChange={handleSetValue}></input>
                    
                  )) : <p>loading...</p>
                 }
             </form>
             <button type="button" className="filter-section-btn filter-section-btn--dark">Set Price</button>
             <div className="filter-section-btn-container">
             <button type="button" onClick={resetBtnClick} className="filter-section-btn filter-section-btn--light">Clear Filter</button>
             <button type="button" className="filter-section-btn filter-section-btn--dark filter-section-btn--apply">Apply</button>
             </div>
             </div>
        </div>
        </div>
        </>
    );
    });

export default Filter;