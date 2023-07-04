import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import UsersCabinet from "./pages/UsersCabinet/UsersCabinet";
import NotFound from "./pages/NotFound/NotFound";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";
import CartPage from "./pages/CartPage/CartPage";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<CartPage />} />
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
