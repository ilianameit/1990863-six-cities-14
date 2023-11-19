import {Navigate} from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';


type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;
  const isLogged = checkAuthorizationStatus(authorizationStatus);

  return (
    isLogged
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}

export default PrivateRoute;
