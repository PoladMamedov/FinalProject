/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef
} from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchCategories } from "../../redux/actions/categories";
import useServer from "../../hooks/useServer";
import { reset } from "../../redux/actions/counterFilter";
import { addFilteredProducts, removeFilteredProducts } from "../../redux/actions/filteredProducts";

const Filter = forwardRef((props, ref) => {
  const { sortValue } = useSelector((state) => state.sortFilter);
  const errorText = useRef();
  const server = useServer();
  const [filters, setFilters] = useState([]);

  const dispatch = useDispatch();
  const {categories} = useSelector(
        (state) => state.categories
        );

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

useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // стейт с ценой
const [valuesPrice, setValuesPrice] = useState({
    Max: "",
    Min: "",
  });

  // стейт чексбоксов
const [checkedItems, setCheckedItems] = useState(
    categories.filter((item) => item.level === 0).map(() => false)
  );

  // функция для cохранения значений инпутов цены в стейте
function handleSetValue(e) {
  const { name, value } = e.target;
  const onlyDigits = value.replace(/\D/g, "");
  setValuesPrice((prevState) => ({ ...prevState, [name]: onlyDigits }));
}

// стейт для хранения выбранных категорий
const [selectedCategories, setSelectedCategories] = useState([]);

async function fetchFilteredProducts(checkedCategories) {
  let filteredProductsResponse;
  try {
    if (valuesPrice.Max !== "" && valuesPrice.Min !== "") {
      if (checkedCategories.length === 0) {
        // Отправка запроса на сервер для фильтрации только по цене
        filteredProductsResponse = await server.getFiltersPrices(
          valuesPrice.Min,
          valuesPrice.Max,
          sortValue
        );
      } else {
        // Отправка запроса на сервер для фильтрации по категориям и цене
        filteredProductsResponse = await server.getFiltersCategoriesPrices(
          checkedCategories,
          valuesPrice.Min,
          valuesPrice.Max,
          sortValue
        );
      }
    } else {
      // Отправка запроса на сервер для фильтрации только по категориям
      filteredProductsResponse = await server.getFiltersCategories(
        checkedCategories,
        sortValue
      );
    }
    const products = Object.values(filteredProductsResponse);
    const firstArray = products[0];
    dispatch(addFilteredProducts(firstArray)); // добавляю фильтрованные продукты в редакс
  } catch (err) {
    console.log(err);
  }
}

const min = parseInt(valuesPrice.Min, 10);
const max = parseInt(valuesPrice.Max, 10);
const isButtonDisabled = Number.isNaN(min) || Number.isNaN(max) || min <= 0 || max <= 0 || min > max;

// функция для проверки того что мин цена меньше макс.
function handleSetPrice() {
    fetchFilteredProducts(selectedCategories);
}

function handlePriceBlur() {
  if (min > max) {
    errorText.current.style.display = "block";
  } else {
    errorText.current.style.display = "none";
  }
}

// функция для сбора категорий по клику на чексбокс
async function handleCheckboxChange(e, index) {
  let category = e.target.name.toLowerCase().replace(/ /g, "_");
  if (category === "smart_watches") {
    category = category.replace(/es$/, "");
  }
  const isChecked = e.target.checked;

  // Обновление стейта checkedItems
  setCheckedItems([
    ...checkedItems.slice(0, index),
    !checkedItems[index],
    ...checkedItems.slice(index + 1),
  ]);

  let updatedSelectedCategories;

  // Обновление массива выбранных категорий
  if (isChecked) {
    updatedSelectedCategories = [...selectedCategories, category];
  } else {
    updatedSelectedCategories = selectedCategories.filter((c) => c !== category);
  }
  setSelectedCategories(updatedSelectedCategories);

  // Отправка запроса на сервер для фильтрации продуктов по категориям
  fetchFilteredProducts(updatedSelectedCategories);
}

// для сброса всех фильтров
function resetBtnClick() {
  setValuesPrice((prevState) => ({ ...prevState, Max: "", Min: "" }));
  setCheckedItems(checkedItems.map(() => false));
  setSelectedCategories([]);
  dispatch(reset());
  dispatch(removeFilteredProducts());
}


const resetBtn = useRef();
useEffect(() => {
if (checkedItems.every((item) => item === false) && Object.values(valuesPrice).every((item) => item === "")) {
resetBtn.current.disabled = true;
} else {
  resetBtn.current.disabled = false;
}
}, [checkedItems, valuesPrice]);

    return (
      <>
        <div className="filter-section">
        <div className="filter-section-full hidden" ref={ref}>
        <h3 className="filter-section__title">Filter</h3>
            <svg onClick={props.toggle} className="filter-section-btn-close" width={25} height={25} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="close"><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.7,14.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-2.3,2.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3L8.3,9.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.3,2.3l2.3-2.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12L15.7,14.3z"></path></svg>
            <div className="filter-section-container">
                <h4 className="filter-section__subtitle">Product Category</h4>
                 <form className="filter-section-list">
                 {
                    categories
                    .filter((item) => item.level === 0)
                    .map((item, index) => (
                    <div key={item.name} className="filter-section-list__item">
                    <label htmlFor={item.name}>{item.name}</label>
                    <input
                    id={item.name}
                    name={item.name}
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={(e) =>  handleCheckboxChange(e, index)}
                    onClick={props.addCounter}
                    className="filter-section-list__item-checkbox"></input>
                    </div>))
                 }
                 </form>
             <h4 className="filter-section__subtitle">Price range</h4>
             <form className="filter-section-inputs">
                 {
                  filters.length !== 0 ? filters.map(({name}, idx) => (
                      <input
                      key={idx}
                      className={"filter-section-inputs__item"}
                      placeholder={name}
                      name={name}
                      type="number"
                      step="1"
                      min="0"
                      value={name === "Max" ? valuesPrice.Max : valuesPrice.Min}
                      onChange={handleSetValue}
                      onBlur={handlePriceBlur}></input>
                  )) : <p>loading...</p>
                 }
             </form>
             <p ref={errorText} className="filter-section-inputs__error-text">Min price cannot be higher than max.</p>
             <button
             type="button"
             className={`filter-section-btn ${isButtonDisabled ? "filter-section-btn--disabled" : "filter-section-btn--dark"}`}
             onClick={handleSetPrice}
             disabled={isButtonDisabled}>Set Price</button>
             <div className="filter-section-btn-container">
             <button type="button" ref={resetBtn} onClick={resetBtnClick} className="filter-section-btn filter-section-btn--light">Clear Filter</button>
             <button type="button" onClick={props.apply} className="filter-section-btn filter-section-btn--dark filter-section-btn--apply">Apply</button>
             </div>
             </div>
        </div>
        </div>
        </>
    );
    });

export default Filter;
