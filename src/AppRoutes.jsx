import { Routes, Route } from 'react-router-dom';
import Testpages from './pages/TestPages/Testpages';
import Header from './components/header';
const AppRoutes = () => {
  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path="/" element={<Testpages />} />
        {/* добавить роуты , Testpages удалить*/}
      </Routes>
    </div>
  );
}

export default AppRoutes;
