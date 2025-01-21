import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { RegisterPropsType } from '../AuthProvider/AuthProvider.type';

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const context = useAuth();
  const inputRef = useRef(null);
  const [password, setPassword] = useState<string>('');
  const [showingPassword, setShowingPassword] = useState(false);
  const { register, modules, getModulePath, options, notify } = context;
  const { register: registerOptions } = modules;
  const { title, description, passwordPattern, passwordPatternMessage } = registerOptions;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const keys = ['firstName', 'lastName', 'birthDate', 'email', 'password'];
    const props = keys.reduce(
      (obj, key) => ({ ...obj, [key]: event.target[key].value }),
      {}
    ) as RegisterPropsType;

    try {
      await register(props, context);
      setLoading(false);
      modules.register.successMessage &&
        notify({ type: 'success', message: modules.register.successMessage });
      history.push(`${getModulePath('login')}?email=${encodeURIComponent(props.email)}`);
    } catch (err) {
      setLoading(false);
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
          <div className="auth-form-row" style={{ position: 'relative' }}>
            <input
              type={showingPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              title={passwordPatternMessage}
              required
              pattern={passwordPattern}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              id="togglePassword"
              className="input-toggle-password"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                setShowingPassword(!showingPassword);
              }}
            >
              {showingPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.37 18.37 0 0 1 3.22-4.94" />
                  <path d="M1 1l22 22" />
                  <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88M20.12 14.12A10.94 10.94 0 0 0 23 12s-4-8-11-8a10.94 10.94 0 0 0-4.17.83" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {options.passwordAgain ? (
            <div className="auth-form-row">
              <input
                type="password"
                name="passwordAgain"
                id="passwordAgain"
                placeholder="PasswordAgain"
                title={passwordPatternMessage}
                required
                ref={inputRef}
                onChange={(event) => {
                  if (event.target.value !== password) {
                    inputRef.current.setCustomValidity("Password verification doesn't match");
                  } else {
                    inputRef.current.setCustomValidity('');
                  }
                  inputRef.current.reportValidity();
                }}
              />
            </div>
          ) : null}
          {registerOptions.termsAndConditions ? (
            <div className="auth-form-tac">
              <label>
                <input type="checkbox" name="tac" id="tac" required />
                {registerOptions.termsAndConditions}{' '}
                <a href={registerOptions.termsAndConditionsLink} target="_blank" rel="noreferrer">
                  {registerOptions.termsAndConditionsLinkText}
                </a>
                {' and the '}
                <a href={registerOptions.privacyPolicyLink} target="_blank" rel="noreferrer">
                  {registerOptions.privacyPolicyLinkText}
                </a>
              </label>
            </div>
          ) : null}
          <div className={`auth-form-submit ${loading ? 'disabled' : ''}`}>
            <input type="submit" value="Submit" disabled={loading} />
          </div>
          <ul className="auth-form-link">
            <li>
              <span>Already have an account? </span>
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
