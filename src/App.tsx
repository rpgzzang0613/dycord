import './App.css';
import Home from './pages/Home.tsx';
import {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import KakaoCallback from './components/sign-in/KakaoCallback.tsx';

const App = () => {
  useEffect(() => {
    if (window?.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
      }
    } else {
      alert('Kakao SDK 로딩 실패');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
