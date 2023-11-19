import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoutes } from '../../const/const';
import React, { FormEvent, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import { loginAction } from '../../store/api-actions';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const activeCity = useAppSelector((state) => state.activeCity);

  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      {isLogged ?
        <Navigate to={AppRoutes.Main} /> :
        (
          <React.Fragment>
            <Helmet>
              <title>6 cities: authorization</title>
            </Helmet>
            <Header withoutLogin/>

            <main className="page__main page__main--login">
              <div className="page__login-container container">
                <section className="login">
                  <h1 className="login__title">Sign in</h1>
                  <form
                    className="login__form form"
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <div className="login__input-wrapper form__input-wrapper">
                      <label className="visually-hidden">E-mail</label>
                      <input
                        className="login__input form__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        ref={loginRef}
                      />
                    </div>
                    <div className="login__input-wrapper form__input-wrapper">
                      <label className="visually-hidden">Password</label>
                      <input
                        className="login__input form__input"
                        type="password"
                        name="password" placeholder="Password"
                        required
                        ref={passwordRef}
                      />
                    </div>
                    <button
                      className="login__submit form__submit button"
                      type="submit"
                      onClick={() => navigate(AppRoutes.Main)}
                    >
                      Sign in
                    </button>
                  </form>
                </section>
                <section className="locations locations--login locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={`${AppRoutes.Main}?city=${activeCity}`}>
                      <span>{activeCity}</span>
                    </Link>
                  </div>
                </section>
              </div>
            </main>
          </React.Fragment>
        )}
    </div>
  );
}

export default LoginScreen;
