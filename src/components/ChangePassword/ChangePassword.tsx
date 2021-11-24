import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import useQuery from '../../hooks/useQuery';

const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { token }: any = useQuery();
  const context = useAuth();
  const { changePassword, modules, getModulePath, options, notify } = context;
  const { changePassword: changePasswordOptions } = modules;
  const { passwordPattern, passwordPatternMessage } = changePasswordOptions;

  if (!token) {
    return <Redirect to={getModulePath('login')} />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const passwordConfirm = event.target.passwordConfirm.value;

    if (password !== passwordConfirm) {
      return notify({
        type: 'error',
        message: 'Password confirmation is wrong. Please check your password and confirmation.'
      });
    }

    setLoading(true);

    try {
      await changePassword({ password, token }, context);
      modules.changePassword.successMessage &&
        notify({ type: 'success', message: modules.changePassword.successMessage });
      history.push(getModulePath('login'));
    } catch (err) {
      notify({ type: 'error', message: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-logo" style={{ backgroundImage: `url(${options.logoUrl}` }} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        <div className="auth-form-title">{modules.changePassword.title}</div>
        <p className="auth-form-description">{modules.changePassword.description}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-form-row">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              title={passwordPatternMessage}
              required
              pattern={passwordPattern}
            />
          </div>
          <div className="auth-form-row">
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Password confirmation"
              title="Please provide same password"
              required
            />
          </div>
          <div className={`auth-form-submit ${loading ? 'disabled' : ''}`}>
            <input type="submit" value="Submit" disabled={loading} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;
