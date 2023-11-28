import { ChangeEvent, FormEvent, memo } from 'react';
import { AuthData } from '../../types/auth-data';

type LoginFormProps = {
  valid: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formData: AuthData;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
};

function LoginFormComponent({valid, onInputChange, formData, onSubmit}: LoginFormProps): JSX.Element {
  return(
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={onSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          onChange={onInputChange}
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
          onChange={onInputChange}
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
  );
}

const LoginForm = memo(LoginFormComponent);
export default LoginForm;
