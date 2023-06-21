import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/header";
import Home from "./pages/Home/Home";
import Footer from "./components/footer";

const AppRoutes = () => {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      <Footer/>
    </>
  );
};

export default AppRoutes;


