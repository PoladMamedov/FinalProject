
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/header";
import Footer from "./components/footer";
import NotFound from "./pages/NotFoundPage/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<h1>mainpage</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </div>
      <Footer/>
    </>

  );
};


export default AppRoutes;
