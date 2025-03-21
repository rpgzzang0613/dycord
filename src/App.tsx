import './App.css';
import Home from './pages/Home.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import KakaoCallback from './components/sign-in/KakaoCallback.tsx';
import NaverCallback from './components/sign-in/NaverCallback.tsx';
import GoogleCallback from './components/sign-in/GoogleCallback.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/callback/kakao" element={<KakaoCallback />} />
        <Route path="/auth/callback/naver" element={<NaverCallback />} />
        <Route path="/auth/callback/google" element={<GoogleCallback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
