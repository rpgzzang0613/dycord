import Home from './pages/Home.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import KakaoCallback from './pages/KakaoCallback.tsx';
import NaverCallback from './pages/NaverCallback.tsx';
import GoogleCallback from './pages/GoogleCallback.tsx';
import Test from './pages/Test.tsx';
import Test2 from './pages/Test2.tsx';

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
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
