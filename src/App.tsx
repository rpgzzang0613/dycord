import './App.css';
import Test from './components/Test.tsx';
import {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import KakaoCallback from './components/KakaoCallback.tsx';

const App = () => {
  useEffect(() => {
    console.log(import.meta.env.VITE_KAKAO_APP_KEY);
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
        <Route path="/" element={<Test />} />
        <Route path="/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
