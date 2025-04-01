import Home from './pages/Home.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import Test from './pages/Test.tsx';
import Test2 from './pages/Test2.tsx';
import OAuth2Callback from './pages/OAuth2Callback.tsx';
import {ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/callback/:platform" element={<OAuth2Callback />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  );
};

export default App;
