import { Routes, Route } from 'react-router-dom';
import Testpages from './pages/TestPages/Testpages';

const AppRoutes = () => {
    return (
        <div className='container'>
          <Routes>
          <Route path="/" element={<Testpages />} />
          {/* добавить роуты , Testpages удалить*/}
        </Routes>
        </div>
    );
}

export default AppRoutes;
