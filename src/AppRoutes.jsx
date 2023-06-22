import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/header";
import TopItemsSlider from "./components/TopItemsSlider/TopItemsSlider";
import styles from "./components/TopItemsSlider/TopItemsSlider.scss";
import Home from "./pages/Home/Home";
import Footer from "./components/footer";
import NotFound from "./pages/NotFoundPage/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/"
            element={
              <>
                <div className={styles.containerSlider}>
                  <TopItemsSlider />
                </div>
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      <Footer/>
    </>
  );
};

export default AppRoutes;


