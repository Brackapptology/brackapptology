import React from 'react';
import { RaisedButton } from 'material-ui';

/**
 * COMPONENT
 */
export const Login = (props) => {
  const { toggleSaw } = props

  return (
    <div className="credential-form">
      <p>In order to save and share your brackets, you must be logged in. We've made it easy for you: just log in with Facebook or Google.</p>
      <div className="credential-form-buttons">
          <div>
            <a href="/auth/google">
              <img src="/google-sign-in.png" id="google-sign-in" />
            </a>
          </div>
          <div>
            <a href="/auth/facebook">
              <img src="/facebook-sign-in.png" id="facebook-sign-in" />
            </a>
          </div>
          <RaisedButton label="I'm fine as a guest" onClick={toggleSaw} />
      </div>
    </div>
  )
}
