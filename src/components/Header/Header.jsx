import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Categories from "../Categories/Categories";
import setPagePath from "../../redux/actions/setPagePath";
import MobileCategory from "../MobileCategory/MobileCategory";

const Header = () => {

  const dispatch = useDispatch();
  const { pagePath } = useSelector((state) => state.currentPath);
  const { token } = useSelector((state) => state.user.userInfo);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pages = ["Products", "About"];
  const menuRef = useRef(null);
  const { categories } = useSelector((state) => state.categories);
  const allCategories = categories.filter((item) => item.parentId === "null");

  const handleClickOutside = (e) => {
    // Проверяем, был ли клик вне меню
    if (
      e.target.tagName !== "SPAN" && e.target.tagName !== "BUTTON" && menuRef.current && !menuRef.current.contains(e.target)
    ) {
      setIsMenuOpen(false);
      setIsCategoriesOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleBtnClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCategoriesOpen(false);

  };
  const handleLinkClick = (path) => {
    setIsCategoriesOpen(isCategoriesOpen ? false : null);
    dispatch(setPagePath(path));
    setIsMenuOpen(!isMenuOpen);
  };
  const handleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleChange = (value) => {
    setSearchTerm(value);
  };
  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(searchTerm);
    setSearchTerm("");
  };

  return (
    <>
      <header className="header">
        <div className="header__container-top">
          <h2 className="header__container-top-title">
            Free shipping across Ukraine
          </h2>
          <nav className={"header__nav-desktop"}>
            <ul className="header__nav-list">
              <li className="header__nav-item" key={1}>
                <NavLink
                  className={`header__nav-link${pagePath === "home" ? "--active" : ""
                    }`}
                  onClick={() => handleLinkClick("home")}
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              {pages.map((item, index) => (
                <li className="header__nav-item" key={index + 1}>
                  <NavLink
                    className={`header__nav-link${pagePath === item.toLowerCase() ? "--active" : ""
                      }`}
                    onClick={() => handleLinkClick(item.toLowerCase())}
                    to={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__container-top-wrap">
            <p
              style={{ fontWeight: 700 }}
              className="header__container-top-lang"
            >
              ENG
            </p>
            <p className="header__container-top-lang">UKR</p>
          </div>
        </div>
        <div className="header__container-bottom">
          <svg
            onClick={() => handleSearch()}
            className="header__nav-search"
            xmlns="http://www.w3.org/2000/svg"
            height="1.1em"
            viewBox="0 0 512 512"
            style={{ fill: "#393d45" }}
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={`header__search-form${isSearchOpen ? "--active" : ""}`}
          >
            <input
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              className={`header__search-input${isSearchOpen ? "--active" : ""
                }`}
              type="text"
              placeholder="Search products..."
            />
            <button
              className={`header__search-submit${isSearchOpen ? "--active" : ""
                }`}
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                viewBox="0 0 512 512"
                style={{ fill: "#393d45" }}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
            <svg
              onClick={() => handleSearch()}
              className="header__search-close"
              xmlns="http://www.w3.org/2000/svg"
              height="1.4em"
              viewBox="0 0 384 512"
            >
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                fill="#393d45"
              />
            </svg>
          </form>

          <NavLink
            className="header__company-logo"
            to="/"
            onClick={() => handleLinkClick(0)}
          >
            <img src="/img/main-logo.png" alt="main-logo" />
          </NavLink>
          <nav
            ref={menuRef}
            className={`header__nav${isMenuOpen ? "--open" : ""}`}
          >
            <ul className="header__nav-list">
              <li className="header__nav-item" key={1}>
                <NavLink
                  className={`header__nav-link${pagePath === "home" ? "--active" : ""
                    }`}
                  onClick={() => handleLinkClick(0)}
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li className={`header__nav-item${isCategoriesOpen ? "--open" : ""}`} key={2}>
                <div className="header__products-link-wrap">
                  <NavLink
                    className={`header__nav-link${pagePath === "products" ? "--active" : ""
                      }`}
                    onClick={() => handleLinkClick(1)}
                    to={"/products"}
                  >
                    Products{" "}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => handleCategories()}
                    className={`header__nav-arrow${isCategoriesOpen ? "--open" : ""}`}
                  >&#9650;</button>
                </div>
              </li>
              {isCategoriesOpen && <ul className="header__mobile-categories">
                <MobileCategory category={allCategories[0].id} />
                <MobileCategory category={allCategories[1].id} />
                <MobileCategory category={allCategories[2].id} />
                <MobileCategory category={allCategories[3].id} />
              </ul>}
              <li className="header__nav-item" key={3}>
                <NavLink
                  className={`header__nav-link${pagePath === "about" ? "--active" : ""
                    }`}
                  onClick={() => handleLinkClick(3)}
                  to={"/about"}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="header__nav-btn-wrap">
            <NavLink to={"/cart"} key={4} className="header__nav-link--cart">
              <img
                className="header__nav-cart"
                src="/img/cart-logo.png"
                alt="cart-logo"
              />
              <span className="header__nav-cart--count">1</span>

              {/* В спан записать с редакса количество в корзине */}
            </NavLink>
            <NavLink
              to={token ? "/cabinet" : "/login"}
              key={5}
              className="header__nav-link--loginBtn"
            >
              <img
                className="header__nav-login"
                src="/img/login.png"
                alt="login-img"
              />
            </NavLink>
          </div>

          <button
            onClick={() => handleBtnClick()}
            className={`header__menu-btn${isMenuOpen ? "--active" : ""}`}
            type="button"
          >
            <span className="header__menu-lines"></span>
            <span className="header__menu-lines"></span>
            <span className="header__menu-lines"></span>
          </button>
        </div>
      </header>

      <Categories />
    </>
  );
};

export default Header;
