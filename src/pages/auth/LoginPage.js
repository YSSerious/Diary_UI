import AuthService from "../../services/AuthService";
import React from "react";
import './LoginPage.css'

export default function LoginPage(props) {

    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');

    function handleLogin(event) {
        event.preventDefault()
        AuthService.login(username.toLowerCase(), password, props.setAuthenticatedUser, props.defaultProps.history);
    }

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1>Sign in</h1>
                <form className="form" onSubmit={handleLogin}>
                    <input className="signinInput" type="text" placeholder="Username" value={username}
                           onInput={e => setUsername(e.target.value)}/>
                    <input className="signinInput" type="password" placeholder="Password" value={password}
                           onInput={e => setPassword(e.target.value)}/>
                    <button type="submit" id="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}