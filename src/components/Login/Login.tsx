import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { LoginPropsType } from '../AuthProvider/AuthProvider.type';

const Login = () => {
  const [notification, setNotification] = useState<any>();
  const context = useAuth();
  const { login, modules, getModulePath, options } = context;

  const onSubmit = async (event) => {
    event.preventDefault();
    const keys = ['email', 'password'];
    const props = keys.reduce(
      (obj, key) => ({ ...obj, [key]: event.target[key].value }),
      {}
    ) as LoginPropsType;

    try {
      await login(props, context);
      setNotification({ type: 'success', message: modules.login.successMessage });
    } catch (err) {
      setNotification({ type: 'error', message: err });
    }
  };

  const logoStyle = options.logoUrl ? { backgroundImage: `url(${options.logoUrl}` } : null;

  return (
    <main className="auth-container">
      <div className="auth-logo" style={logoStyle} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        {notification?.type === 'error' ? (
          <div className="auth-form-error">{notification.message}</div>
        ) : null}
        {notification?.type === 'success' ? (
          <div className="auth-form-success">{notification.message}</div>
        ) : null}
        <div className="auth-form-title">{modules.login.title}</div>
        <p className="auth-form-description">{modules.login.description}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-form-row">
            <input type="email" name="email" id="email" placeholder="E-mail" required />
          </div>
          <div className="auth-form-row">
            <input type="password" name="password" id="password" placeholder="Password" required />
          </div>
          <div className="auth-form-submit">
            <input type="submit" value="Submit" />
          </div>
          <ul className="auth-form-link">
            <li>
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
