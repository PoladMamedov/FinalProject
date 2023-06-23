import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/header/index";
import Home from "./pages/Home/Home";
import Footer from "./components/footer";
import UsersCabinet from "./pages/UsersCabinet/UsersCabinet";
import NotFound from "./pages/NotFoundPage/NotFound";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/cabinet" element={<UsersCabinet />} />
        <Route path="/products/:itemNo" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;


