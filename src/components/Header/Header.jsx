import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { fetchCategories } from "../../redux/actions/categories";
import setPagePath from "../../redux/actions/pagePath";
import MobileCategory from "../MobileCategory/MobileCategory";
import SearchBar from "../SearchBar/SearchBar";
import Currency from "../Currency/Currency";

const Header = () => {

  const dispatch = useDispatch();
  const { pagePath } = useSelector((state) => state.currentPath);
  const { token } = useSelector((state) => state.user.userInfo);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const pages = ["Products", "About"];
  const menuRef = useRef(null);
  const { categories } = useSelector((state) => state.categories);
  const allCategories = categories.filter((item) => item.parentId === "null");

  const handleClickOutside = (e) => {
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
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
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

  return (
    <>
      <header className="header">
        <div className="container">
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
              <Currency />
            </div>
          </div>
          <div className="header__container-bottom">
            <div className="header__container-burger-wrap">
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
            <SearchBar />

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
                  <MobileCategory setIsMenuOpen={setIsMenuOpen} category={allCategories[0].id} />
                  <MobileCategory setIsMenuOpen={setIsMenuOpen} category={allCategories[1].id} />
                  <MobileCategory setIsMenuOpen={setIsMenuOpen} category={allCategories[2].id} />
                  <MobileCategory setIsMenuOpen={setIsMenuOpen} category={allCategories[3].id} />
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
              <div className="header__mobile-currency">
                <Currency />
              </div>
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
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
