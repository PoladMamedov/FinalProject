/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef
} from "react";
import { useDispatch, useSelector } from "react-redux";
import useServer from "../../hooks/useServer";
import { reset, getAllSubcategoriesCounter } from "../../redux/actions/counterFilter";
import { addFilteredProducts, removeFilteredProducts } from "../../redux/actions/filteredProducts";
import { sortLowToHighPrice } from "../../redux/actions/sortFilter";

const Filter = forwardRef(({
  categories, toggle, addCounter, apply, subcategorieParent
}, ref) => {
  const { sortValue } = useSelector((state) => state.sortFilter);
  const errorText = useRef();
  const server = useServer();
  const [filters, setFilters] = useState([]);

  const { subcategory } = useSelector((state) => state.subcategory);
  const allCategories = categories.map(({ name }) => name.toLowerCase()).filter((item) => item !== "all");

  const dispatch = useDispatch();

  const price = useSelector((state) => state.filteredProducts.filteredProducts);
  const new_array = price.map((e) => {
    return e.currentPrice;
  });

  let minArr = Math.ceil(Math.min(...new_array));
  let maxArr = Math.ceil(Math.max(...new_array));


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
    dispatch(sortLowToHighPrice());
  }, []);

  // стейт с ценой
  const [valuesPrice, setValuesPrice] = useState({
    Max: "",
    Min: "",
  });

  // стейт чексбоксов
  const [checkedItems, setCheckedItems] = useState(
    categories.map(() => false)
  );

  // функция для cохранения значений инпутов цены в стейте
  function handleSetValue(e) {
    const { name, value } = e.target;
    const onlyDigits = value.replace(/\D/g, "");
    setValuesPrice((prevState) => ({ ...prevState, [name]: onlyDigits }));
  }

  // стейт для хранения выбранных категорий
  const [selectedCategories, setSelectedCategories] = useState([]);

  async function fetchFilteredProducts(checkedCategories, subcategorie) {
    let filteredProductsResponse;
    try {
      if (valuesPrice.Max !== "" && valuesPrice.Min !== "") {
        // Отправка запроса на сервер для фильтрации только по цене
        if (checkedCategories.length === 0) {
          if (subcategorie) {
            filteredProductsResponse = await server.getFiltersPricesBySubcategory(
              subcategorieParent,
              valuesPrice.Min,
              valuesPrice.Max,
              sortValue
            );
          } else {
            filteredProductsResponse = await server.getFiltersPrices(
              valuesPrice.Min,
              valuesPrice.Max,
              sortValue
            );
          }
        } else {
          // Отправка запроса на сервер для фильтрации по категориям и цене
          if (subcategorie) {
            filteredProductsResponse = await server.getFiltersCategoriesPricesBySubcategory(
              subcategorieParent,
              checkedCategories,
              valuesPrice.Min,
              valuesPrice.Max,
              sortValue
            );
          } else {
            filteredProductsResponse = await server.getFiltersCategoriesPrices(
              checkedCategories,
              valuesPrice.Min,
              valuesPrice.Max,
              sortValue,

            );
          }
        }
      } else {
        // Отправка запроса на сервер для фильтрации только по категориям
        if (subcategorie) {
          filteredProductsResponse = await server.getFiltersCategoriesBySubcategory(
            subcategorieParent,
            checkedCategories,
            sortValue
          );
        } else {
          filteredProductsResponse = await server.getFiltersCategories(
            checkedCategories,
            sortValue
          );
        }
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
  const isButtonDisabled = Number.isNaN(min) || Number.isNaN(max) || min <= minArr || max <= maxArr || min > max;

  function handleSetPrice() {
    fetchFilteredProducts(selectedCategories, subcategorieParent);
  }

  function handlePriceBlur() {
    if (min > max) {
      errorText.current.style.display = "block";
    } else {
      errorText.current.style.display = "none";
    }
  }

  async function handleCheckboxChange(e, index) {
    let category = e.target.name.toLowerCase().replace(/ /g, "_");
    if (category === "smart_watches") {
      category = category.replace(/es$/, "");
    }
    const isChecked = e.target.checked;

    setCheckedItems((prevCheckedItems) => [
      ...prevCheckedItems.slice(0, index),
      !prevCheckedItems[index],
      ...prevCheckedItems.slice(index + 1),
    ]);

    let updatedSelectedCategories;

    // Обновление массива выбранных категорий
    if (category === "all") {
      setCheckedItems(checkedItems.map(() => true));
      updatedSelectedCategories = allCategories;
    } else {
      if (isChecked) {
        updatedSelectedCategories = [...selectedCategories, category];
      } else {
        updatedSelectedCategories = selectedCategories.filter((c) => c !== category);
      }

      // Снятие галочки с категории "All", если все выбраны и кликаем на что-то другое.
      if (!isChecked && selectedCategories.length === allCategories.length) {
        const allIndex = categories.findIndex((item) => item.name === "All");
        setCheckedItems((prev) => [
          ...prev.slice(0, allIndex),
          false,
          ...prev.slice(allIndex + 1),
        ]);
        updatedSelectedCategories = updatedSelectedCategories.filter((c) => c !== "all");
      }
    }
    setSelectedCategories(updatedSelectedCategories);

    // Отправка запроса на сервер для фильтрации продуктов по категориям
    fetchFilteredProducts(updatedSelectedCategories, subcategorieParent);
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


  useEffect(() => {
    if (subcategorieParent) {
      let initialSelectedCategories;
      if (subcategory === "All") {
        setCheckedItems(checkedItems.map(() => true));
        initialSelectedCategories = allCategories;
      } else {
        setCheckedItems(categories.map((category) => subcategory.includes(category.name)));
        initialSelectedCategories = categories.filter((category) => subcategory.includes(category.name)).map((category) => category.name.toLowerCase().replace(/ /g, "_"));
      }
      setSelectedCategories(initialSelectedCategories);
      fetchFilteredProducts(initialSelectedCategories, subcategorieParent);
      dispatch(getAllSubcategoriesCounter(categories.length)); // тут исправить
    }
  }, [sortValue]);


  return (
    <>
      <div className="filter-section" ref={ref}>
        <h3 className="filter-section__title">Filter</h3>
        <svg onClick={toggle} className="filter-section-btn-close" width={25} height={25} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="close"><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.7,14.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-2.3,2.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3L8.3,9.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.3,2.3l2.3-2.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12L15.7,14.3z"></path></svg>
        <div className="filter-section-container">
          <h4 className="filter-section__subtitle">Product Category</h4>
          <form className="filter-section-list">
            {
              categories
                .map((item, index) => (
                  <div key={item.name} className="filter-section-list__item">
                    <label htmlFor={item.name}>{item.name}</label>
                    <input
                      id={item.name}
                      name={item.name}
                      type="checkbox"
                      checked={checkedItems[index]}
                      onChange={(e) => handleCheckboxChange(e, index)}
                      onClick={addCounter}
                      className="filter-section-list__item-checkbox"></input>
                  </div>))
            }
          </form>
          <h4 className="filter-section__subtitle">Price range</h4>
          <form className="filter-section-inputs">
            {
              filters.length !== 0 ? filters.map(({ name }, idx) => (
                <input
                  key={idx}
                  className={"filter-section-inputs__item"}
                  placeholder={(name === "Min") ? `${name} ${minArr}` : `${name} ${maxArr}`}
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
            <button type="button" onClick={apply} className="filter-section-btn filter-section-btn--dark filter-section-btn--apply">Apply</button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Filter;