import React from "react";
import AuthService from "../services/AuthService";
import HeaderLink from "./HeaderLink";
import AddRecordsDropdownContent from "./AddRecordsDropdownContent";
import './Header.css'

export default function Header(props) {
    return (
        <nav className="headerNav">
            <ul className="headerUl">
                <HeaderLink visible={true} lable={'Home'} path={'/'}/>
                <HeaderLink visible={props.authenticatedUser} lable={'Records'} path={'/records'} isDropdown={true} children={
                    <AddRecordsDropdownContent year={props.year} setYear={props.setYear} reloadRecordsFlag={props.reloadRecordsFlag}
                                               setReloadRecordsFlag={props.setReloadRecordsFlag}/>
                }/>
                <HeaderLink visible={!props.authenticatedUser} lable={'Sign up'} path={'/register'} floatRight={true}/>
                <HeaderLink visible={!props.authenticatedUser} lable={'Sign in'} path={'/login'} floatRight={true}/>
                {
                    props.authenticatedUser &&
                    <li className="headerLi rightLi">
                        <a href="/login" onClick={logOut}>Log out</a>
                    </li>
                }
            </ul>
        </nav>
    );

    function logOut() {
        AuthService.logout(props.setAuthenticatedUser)
    }
}