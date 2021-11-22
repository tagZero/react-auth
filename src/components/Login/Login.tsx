import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { LoginPropsType } from '../AuthProvider/AuthProvider.type';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const params: URLSearchParams = new URLSearchParams(window.location.search?.substring(1));
  const context = useAuth();
  const { login, modules, getModulePath, options, notify } = context;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const keys = ['email', 'password'];
    const props = keys.reduce(
      (obj, key) => ({ ...obj, [key]: event.target[key].value }),
      {}
    ) as LoginPropsType;

    try {
      await login(props, context);
      modules.login.successMessage && notify({ type: 'success', message: modules.login.successMessage });
    } catch (err) {
      notify({ type: 'error', message: err });
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
              {...(params.has('email') ? { defaultValue: params.get('email') } : { autoFocus: true })}
            />
          </div>
          <div className="auth-form-row">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              {...(params.has('email') ? { autoFocus: true } : {})}
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
