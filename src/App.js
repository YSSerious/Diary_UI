import './App.css';
import React from "react";
import {Route} from "react-router";
import HomePage from "./pages/HomePage";
import RecordsPage from "./pages/RecordsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import {authHeaderName} from "./services/ServiceConstants";
import Header from "./header/Header";

function App() {

    let [year, setYear] = React.useState(new Date().getFullYear());
    let [reloadRecordsFlag, setReloadRecordsFlag] = React.useState([true]);
    let [authenticatedUser, setAuthenticatedUser] = React.useState(JSON.parse(localStorage.getItem(authHeaderName)));

    return (
        <div>
            <Header authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser}
                year={year} setYear={setYear} reloadRecordsFlag={reloadRecordsFlag} setReloadRecordsFlag={setReloadRecordsFlag}/>
            <div className="contentBody">
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/records" component={() => (<RecordsPage year={year} reloadRecordsFlag={reloadRecordsFlag} />)}/>
                <Route exact path="/login"
                       component={(props) => (<LoginPage defaultProps={props} setAuthenticatedUser={setAuthenticatedUser}/>)}/>
                <Route exact path="/register" component={RegisterPage}/>
            </div>
        </div>
    );
}
export default App;
