import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoutes, CityName } from '../../const/const';
import React, { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../../components/login-form/login-form';

function LoginScreenComponent(): JSX.Element {
  const [valid, setValid] = useState(false);
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const isValidForm = (form: AuthData) => {
    const validEmail = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w+)$/);
    const validPass = new RegExp(/^(?=.*\d)(?=.*[a-z]).*$/);
    const isValidEmail = validEmail.test(form.email);
    const isValidPass = validPass.test(form.password);

    return isValidEmail && isValidPass;
  };

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (isValidForm({ ...formData, [name]: value })) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [formData]);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (valid) {
      dispatch(loginAction({
        email: formData.email,
        password: formData.password
      }));
    }
  }, [dispatch, formData.email, formData.password, valid]);

  const randomCity = CityName[Math.floor(Math.random() * CityName.length)];

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
                  <LoginForm valid={valid} onInputChange={handleInputChange} formData={formData} onSubmit={handleSubmit}/>
                </section>
                <section className="locations locations--login locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={`${AppRoutes.Main}?city=${randomCity}`}>
                      <span>{randomCity}</span>
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

const LoginScreen = memo(LoginScreenComponent);
export default LoginScreen;
