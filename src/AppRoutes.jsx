import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import UsersCabinet from "./pages/UsersCabinet/UsersCabinet";
import NotFound from "./pages/NotFoundPage/NotFound";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:itemNo" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/cabinet" element={<UsersCabinet />} />
        </Route>
      </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
