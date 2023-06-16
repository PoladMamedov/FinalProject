
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

const AppRoutes = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<h1>mainpage</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
};


export default AppRoutes;
