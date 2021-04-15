import AuthService from "../../services/AuthService";
import React from "react";

export default function LoginPage(props) {

    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');

    function handleLogin(event) {
        event.preventDefault()
        AuthService.login(username.toLowerCase(), password, props.setAuthenticatedUser, props.defaultProps.history);
    }

    return (
        <div className="wrapper">
            <div className="container">
                <h1>Sign in</h1>

                <form className="form" onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username}
                           onInput={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password}
                           onInput={e => setPassword(e.target.value)}/>
                    <button type="submit" id="login-button">Login</button>
                </form>
            </div>

            <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}