import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '../../services/user/slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, onlyUnAuth = false }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    console.log('WAIT USER CHECKOUT');
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    console.log('NAVIGATE FROM LOGIN TO INDEX');
    const from = location.state ?? { from: { pathname: '/' } };
    const background = from?.state || null;
    return <Navigate replace to={from.from} state={background} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('NAVIGATE FROM PAGE TO LOGIN');
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  console.log('RENDER COMPONENT');
  // location.state = { from: location };
  console.log(location);
  return children;
}

export { ProtectedRoute };
