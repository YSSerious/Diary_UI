import './App.css';
import React, {useEffect} from "react";
import {Route} from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import {authHeaderName} from "./services/ServiceConstants";
import Header from "./header/Header";
import RecordService from "./services/RecordService";
import RecordsContent from "./records/RecordsContent";

function App() {

    let [year, setYear] = React.useState(new Date().getFullYear());
    let [timeLines, setTimeLines] = React.useState([]);
    let [months, setMonths] = React.useState([]);
    let [authenticatedUser, setAuthenticatedUser] = React.useState(JSON.parse(localStorage.getItem(authHeaderName)));

    useEffect(() => {
        RecordService.getYearRecords(year, setMonths);
    }, [year]);

    useEffect(() => {
        RecordService.getTimeLInes(setTimeLines);
    }, []);

    return (
        <div>
            <Header authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} year={year} setYear={setYear} months={months} setMonths={setMonths}/>
            <div className="contentBody">
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/records" component={() => (<RecordsContent months={months} setMonths={setMonths} timeLines={timeLines} year={year}/>)}/>
                <Route exact path="/login"
                       component={(props) => (<LoginPage defaultProps={props} setAuthenticatedUser={setAuthenticatedUser}/>)}/>
                <Route exact path="/register" component={RegisterPage}/>
            </div>
        </div>
    );
}
export default App;
