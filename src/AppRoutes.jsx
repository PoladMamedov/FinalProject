
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Header from "./components/header";
import Home from "./pages/Home/Home";
const AppRoutes = () => {
  return (
    <>
      <Header />
      {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      {/* </div> */}
    </>

  );
};


export default AppRoutes;
