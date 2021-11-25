import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { useCaptcha } from '../CaptchaProvider/CaptchaProvider';

const ResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const context = useAuth();
  const { resetPassword, modules, getModulePath, options, notify } = context;
  const { incrementFailureCount, getCaptchaToken } = useCaptcha();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target.email.value;
    const props: any = {
      email
    };

    const captchaToken = await getCaptchaToken();
    if (captchaToken) {
      props.captchaToken = captchaToken;
    }

    try {
      await resetPassword(props, context);
      modules.resetPassword.successMessage &&
        notify({ type: 'success', message: modules.resetPassword.successMessage });
    } catch (err) {
      notify({ type: 'error', message: err });
    } finally {
      setLoading(false);
      incrementFailureCount();
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-logo" style={{ backgroundImage: `url(${options.logoUrl}` }} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        <div className="auth-form-title">{modules.resetPassword.title}</div>
        <p className="auth-form-description">{modules.resetPassword.description}</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-form-row">
            <input type="email" name="email" id="email" placeholder="E-mail" required />
          </div>
          <div className={`auth-form-submit ${loading ? 'disabled' : ''}`}>
            <input type="submit" value="Submit" disabled={loading} />
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
