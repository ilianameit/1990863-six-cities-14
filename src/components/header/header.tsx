import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoutes} from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffers } from '../../store/actions';
import { useEffect } from 'react';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import { logoutAction } from '../../store/api-actions';

type HeaderProp = {
  withoutLogin?: boolean;
}

function Header({withoutLogin}: HeaderProp): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const favorites = useAppSelector((state) => state.favorites);
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const handleLogOutClick = () => {
    dispatch(logoutAction());
  };
  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>

          {withoutLogin ? false : (

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {isLogged ? (
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{backgroundImage: `url("${user?.avatarUrl}")` }}
                      >
                      </div>
                      <span className="header__user-name user__name">
                        {user?.email}
                      </span>
                      <span className="header__favorite-count">
                        {favorites.length}
                      </span>
                    </Link>
                  ) : (
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  )}
                </li>
                {isLogged ? (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoutes.Main}
                      onClick={handleLogOutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                ) : false }
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
