import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';

const ResetPassword = () => {
  const [notification, setNotification] = useState<any>();
  const context = useAuth();
  const { resetPassword, modules, getModulePath, options } = context;

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      await resetPassword({ email }, context);
      setNotification({ type: 'success', message: modules.resetPassword.successMessage });
    } catch (err) {
      setNotification({ type: 'error', message: err });
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-logo" style={{ backgroundImage: `url(${options.logoUrl}` }} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        {notification?.type === 'error' ? (
          <div className="auth-form-error">{notification.message}</div>
        ) : null}
        {notification?.type === 'success' ? (
          <div className="auth-form-success">{notification.message}</div>
        ) : null}
        <div className="auth-form-title">{modules.resetPassword.title}</div>
        <p className="auth-form-description">{modules.resetPassword.description}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-form-row">
            <input type="email" name="email" id="email" placeholder="E-mail" required />
          </div>
          <div className="auth-form-submit">
            <input type="submit" value="Submit" />
          </div>
          <ul className="auth-form-link">
            <li>
              <Link to={getModulePath('login')}>{modules.login.text}</Link>
            </li>
            <li>
              <Link to={getModulePath('register')}>{modules.register.text}</Link>
            </li>
          </ul>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
