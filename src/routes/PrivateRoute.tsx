import {useMemberStore} from '../zustand/MemberStore.ts';
import {useShallow} from 'zustand/react/shallow';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

const PrivateRoute = () => {
  const {isSignedIn} = useMemberStore(
    useShallow(state => ({
      isSignedIn: state.isSignedIn,
    }))
  );

  const location = useLocation();

  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" replace state={{from: location}} />;
};

export default PrivateRoute;
