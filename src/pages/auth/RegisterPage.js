import React from "react";

export default function RegisterPage(props) {

    let [email, setEmail] = React.useState('');
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');

    function handleRegistration(event){
        event.preventDefault()
        console.log(email+' '+username+' '+password);
    }

    return (
        <div className="wrapper">
            <div className="container">
                <h1>Sign Up</h1>

                <form className="form" onSubmit={handleRegistration}>
                    <input type="text" placeholder="Email" value={email} onInput={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder="Username" value={username} onInput={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)}/>
                    <button type="submit" id="login-button">Save</button>
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