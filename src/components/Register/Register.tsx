import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';

const Register = () => {
  const { register, modules, getModulePath, options } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    const keys = ['firstName', 'lastName', 'email', 'password'];
    const props = keys.reduce((obj, key) => ({ ...obj, [key]: event.target[key].value }), {});
    await register(props);
  };

  return (
    <main className="ae-container">
      <div className="ae-logo" style={{ backgroundImage: `url(${options.logoUrl}` }} />
      {options.logoTitle ? <div className="ae-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container tile">
        <div className="auth-form-title">{modules.register.title}</div>
        <p className="auth-form-description">{modules.register.description}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-form-row">
            <input type="text" name="firstName" id="firstName" placeholder="First name" required />
            <input type="text" name="lastName" id="lastName" placeholder="Last name" required />
          </div>
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
              <Link to={getModulePath('login')}>{modules.login.text}</Link>
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

export default Register;
