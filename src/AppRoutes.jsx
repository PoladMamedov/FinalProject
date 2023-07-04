import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import UsersCabinet from "./pages/UsersCabinet/UsersCabinet";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";

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
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<Cart />} />
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
