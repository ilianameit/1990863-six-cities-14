import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoutes} from '../const';
import { checkAuthorizationStatus } from '../../utils/authorixation-status/check-authorization-status';
import { authorizationStatus } from '../../utils/authorixation-status/auhtorizationStatus';

type HeaderProp = {
  withoutLogin?: boolean;
}

function Header({withoutLogin}: HeaderProp): JSX.Element {
  const isLogged = checkAuthorizationStatus(authorizationStatus);
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
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
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
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
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