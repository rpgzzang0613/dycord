import './App.css';
import Home from './pages/Home.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import KakaoCallback from './components/sign-in/KakaoCallback.tsx';
import NaverCallback from './components/sign-in/NaverCallback.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/auth/naver/callback" element={<NaverCallback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
