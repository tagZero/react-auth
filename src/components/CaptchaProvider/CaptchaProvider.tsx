import React, { createContext, useContext, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useAuth } from '../AuthProvider/AuthProvider';

const CaptchaContext = createContext({} as any);
export const useCaptcha = () => useContext(CaptchaContext);

const CaptchaProvider = ({ children, options }) => {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [failureCount, setFailureCount] = useState(0);
  const captchaRef = useRef(null);
  const { notify } = useAuth();

  const incrementFailureCount = () => setFailureCount(failureCount + 1);

  const executeCaptcha = async () => captchaRef.current.execute({ async: true });

  const getCaptchaToken = async () => {
    let hCaptchaToken = null;
    if (options.enabled && failureCount >= options.maxFailureCount) {
      if (captchaToken) {
        hCaptchaToken = captchaToken;
      } else {
        const { response } = await executeCaptcha();
        hCaptchaToken = response;
      }
    }
    return hCaptchaToken;
  };

  const onCaptchaError = (message) => {
    notify({
      type: 'error',
      message
    });
  };

  const onCaptchaExpire = () => {
    notify({
      type: 'error',
      message: 'hCaptcha token expired'
    });
  };

  const getTheme = () => {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch (err) {
      return 'light';
    }
  };

  return (
    <CaptchaContext.Provider
      value={{
        incrementFailureCount,
        getCaptchaToken
      }}
    >
      {children}
      {options.enabled && failureCount >= options.maxFailureCount ? (
        <div className={`captcha-container`}>
          <HCaptcha
            theme={getTheme()}
            sitekey={options.siteKey}
            onVerify={setCaptchaToken}
            onError={onCaptchaError}
            onExpire={onCaptchaExpire}
            ref={captchaRef}
          />
        </div>
      ) : null}
    </CaptchaContext.Provider>
  );
};

export default CaptchaProvider;
