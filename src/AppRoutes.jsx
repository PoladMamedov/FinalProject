import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/header/index";
import Home from "./pages/Home/Home";
import Footer from "./components/footer";
import UsersCabinet from "./pages/UsersCabinet/UsersCabinet";
import NotFound from "./pages/NotFoundPage/NotFound";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Products from "./pages/Products/Products";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/cabinet" element={<UsersCabinet />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
