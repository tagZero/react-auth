import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { RegisterPropsType } from '../AuthProvider/AuthProvider.type';

const Register = () => {
  const context = useAuth();
  const { register, modules, getModulePath, options } = context;

  const onSubmit = async (event) => {
    event.preventDefault();
    const keys = ['firstName', 'lastName', 'birthDate', 'email', 'password'];
    const props = keys.reduce(
      (obj, key) => ({ ...obj, [key]: event.target[key].value }),
      {}
    ) as RegisterPropsType;
    await register(props, context);
  };

  return (
    <main className="auth-container">
      <div className="auth-logo" style={{ backgroundImage: `url(${options.logoUrl}` }} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        <div className="auth-form-title">{modules.register.title}</div>
        <p className="auth-form-description">{modules.register.description}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-form-row">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              maxLength={30}
              required
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              maxLength={30}
              required
            />
          </div>
          <div className="auth-form-row">
            <input type="date" name="birthDate" id="birthDate" placeholder="Date of birth" required />
          </div>
          <div className="auth-form-row">
            <input type="email" name="email" id="email" placeholder="E-mail" required />
          </div>
          <div className="auth-form-row">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              title={modules.register.passwordPatternMessage}
              required
              pattern={modules.register.passwordPattern}
            />
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
