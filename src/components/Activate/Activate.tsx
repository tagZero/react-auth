import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import useQuery from '../../hooks/useQuery';
import { useCaptcha } from '../CaptchaProvider/CaptchaProvider';

const Activate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { token }: any = useQuery();
  const context = useAuth();
  const { activate, modules, getModulePath, options, notify } = context;
  const { incrementFailureCount, getCaptchaToken } = useCaptcha();

  const tryActivation = async () => {
    setLoading(true);
    try {
      const props: any = {
        token
      };

      const captchaToken = await getCaptchaToken();
      if (captchaToken) {
        props.captchaToken = captchaToken;
      }

      await activate(props, context);
      modules.activate.successMessage &&
        notify({ type: 'success', message: modules.activate.successMessage });
      history.push(getModulePath('login'));
    } catch (err) {
      notify({ type: 'error', message: err });
    } finally {
      setLoading(false);
      incrementFailureCount();
    }
  };

  useEffect(() => {
    if (token) {
      tryActivation();
    }
  }, [token]);

  if (!token) {
    return <Redirect to={getModulePath('login')} />;
  }

  return (
    <main className="auth-container">
      <div className="auth-logo" style={{ backgroundImage: `url(${options.logoUrl}` }} />
      {options.logoTitle ? <div className="auth-title">{options.logoTitle}</div> : null}
      <div className="auth-form-container auth-tile">
        <div className="auth-form-title">{modules.activate.title}</div>
        <p className="auth-form-description auth-text-center">{modules.activate.description}</p>
      </div>
    </main>
  );
};

export default Activate;
