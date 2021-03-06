import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import { forgotPasswordUrl } from 'Config/app.json';
import connect from './connector';
import styles from './style';

/**
 * The ForgotPassword component.
 * @param {Object} props The component properties.
 * @returns {JSX}
 */
const ForgotPassword = ({ showForgotPasswordPopup }) => {
  const forgotPasswordString = 'login.forgot_password';

  if (forgotPasswordUrl) {
    return (
      <Link href={forgotPasswordUrl} className={styles}>
        <I18n.Text string={forgotPasswordString} />
      </Link>
    );
  }

  return (
    <div className={styles} onClick={showForgotPasswordPopup} aria-hidden>
      <I18n.Text string={forgotPasswordString} />
    </div>
  );
};

ForgotPassword.propTypes = {
  showForgotPasswordPopup: PropTypes.func.isRequired,
};

export default connect(ForgotPassword);
