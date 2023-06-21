import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/header";
import TopItemsSlider from "./components/TopItemsSlider/TopItemsSlider";
import styles from "./components/TopItemsSlider/TopItemsSlider.scss";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
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
      </div>
    </>
  );
};

export default AppRoutes;


