import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthChecked, user } from '../../services/user/slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(user);
  const isAuthChecked = useSelector(isAuthChecked);

  if (!isAuthChecked) {
    console.log('WAIT USER CHECKOUT');
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    console.log('NAVIGATE FROM LOGIN TO INDEX');
    const from = location.state?.from || { pathname: '/' };
    const background = from?.state || null;
    return <Navigate replace to={from} state={background} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('NAVIGATE FROM PAGE TO LOGIN');
    return <Navigate replace to='/login' state={ {from: location} }  />;
  }

  console.log('RENDER COMPONENT');
  return children;
}

export { ProtectedRoute };
