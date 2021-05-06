import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { RegisterPropsType } from '../AuthProvider/AuthProvider.type';

const Register = () => {
  const history = useHistory();
  const context = useAuth();
  const { register, modules, getModulePath, options, notify } = context;
  const { register: registerOptions } = modules;
  const { title, description, passwordPattern, passwordPatternMessage, successMessage } = registerOptions;

  const onSubmit = async (event) => {
    event.preventDefault();
    const keys = ['firstName', 'lastName', 'birthDate', 'email', 'password'];
    const props = keys.reduce(
      (obj, key) => ({ ...obj, [key]: event.target[key].value }),
      {}
    ) as RegisterPropsType;

    try {
      await register(props, context);
      notify({ type: 'success', message: successMessage });
      history.push(getModulePath('login'));
    } catch (err) {
      notify({ type: 'error', message: err });
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-logo" style={{ backgroundImage: `url(${options.logoUrl}` }} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        <div className="auth-form-title">{title}</div>
        <p className="auth-form-description">{description}</p>
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
              title={passwordPatternMessage}
              required
              pattern={passwordPattern}
            />
          </div>
          {registerOptions.termsAndConditions ? (
            <div className="auth-form-tac">
              <label>
                <input type="checkbox" name="tac" id="tac" required />
                {registerOptions.termsAndConditions}&nbsp;
                <a href={registerOptions.termsAndConditionsLink} target="_blank" rel="noreferrer">
                  {registerOptions.termsAndConditionsLinkText}
                </a>
              </label>
            </div>
          ) : null}
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
