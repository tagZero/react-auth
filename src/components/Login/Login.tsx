import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { LoginPropsType } from '../AuthProvider/AuthProvider.type';
import { useCaptcha } from '../CaptchaProvider/CaptchaProvider';
import useQuery from '../../hooks/useQuery';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const query: any = useQuery();
  const context = useAuth();
  const { login, modules, getModulePath, options, notify } = context;
  const { incrementFailureCount, getCaptchaToken } = useCaptcha();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const keys = ['email', 'password'];
      const props = keys.reduce(
        (obj, key) => ({ ...obj, [key]: event.target[key].value }),
        {}
      ) as LoginPropsType;

      const captchaToken = await getCaptchaToken();
      if (captchaToken) {
        props.captchaToken = captchaToken;
      }

      await login(props, context);
      modules.login.successMessage && notify({ type: 'success', message: modules.login.successMessage });
    } catch (err) {
      incrementFailureCount();
      notify({ type: 'error', message: modules.login.failureMessage });
    } finally {
      setLoading(false);
    }
  };

  const logoStyle = options.logoUrl ? { backgroundImage: `url(${options.logoUrl}` } : null;

  return (
    <main className="auth-container">
      <div className="auth-logo" style={logoStyle} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        <div className="auth-form-title">{modules.login.title}</div>
        <p className="auth-form-description">{modules.login.description}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-form-row">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
              defaultValue={query?.email ? query.email : ''}
            />
          </div>
          <div className="auth-form-row">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              {...(query?.email ? { autoFocus: true } : {})}
            />
          </div>
          <div className={`auth-form-submit ${loading ? 'disabled' : ''}`}>
            <input type="submit" value="Submit" disabled={loading} />
          </div>
          <ul className="auth-form-link">
            <li>
              <span>New user? </span>
              <Link to={getModulePath('register')}>{modules.register.text}</Link>
            </li>
            <li>
              <Link to={getModulePath('resetPassword')}>{modules.resetPassword.text}</Link>
            </li>
          </ul>
        </form>
      </div>
    </main>
  );
};

export default Login;
