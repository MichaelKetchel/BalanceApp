import React from 'react';
import PropTypes from 'prop-types';
import './Login.scss';

const Login = (props) => {
    return (
        <div className="LoginComponent">
            <div className="WelcomeTo">Welcome to</div>
            <div className="Balance">BALANCE</div>

            <button onClick={props.onLogin} className="SignInButton">Sign In</button>
        </div>
    );
};

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
};

export default Login;
