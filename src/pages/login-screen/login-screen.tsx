import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoutes } from '../../const/const';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import { getActiveCity } from '../../store/slices/offers/selectors';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginScreen(): JSX.Element {
  const [valid, setValid] = useState(false);
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const activeCity = useAppSelector(getActiveCity);

  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const isValidForm = (form: AuthData) => {
    const validEmail = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w+)$/);
    const validPass = new RegExp(/^(?=.*\d)(?=.*[a-z]).*$/);
    const isValidEmail = validEmail.test(form.email);
    const isValidPass = validPass.test(form.password);

    return isValidEmail && isValidPass;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (isValidForm({ ...formData, [name]: value })) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (valid) {
      dispatch(loginAction({
        email: formData.email,
        password: formData.password
      }));
    }
  };
  //доделать дочерний компонент
  return (
    <div className="page page--gray page--login">
      {isLogged ?
        <Navigate to={AppRoutes.Main} /> :
        (
          <React.Fragment>
            <Helmet>
              <title>6 cities: authorization</title>
            </Helmet>

            <ToastContainer />

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
                        onChange={handleInputChange}
                        value={formData.email}
                        className="login__input form__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="login__input-wrapper form__input-wrapper">
                      <label className="visually-hidden">Password</label>
                      <input
                        onChange={handleInputChange}
                        value={formData.password}
                        className="login__input form__input"
                        type="password"
                        name="password" placeholder="Password"
                        required
                      />
                    </div>
                    <button
                      className="login__submit form__submit button"
                      type="submit"
                      disabled={!valid}
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
