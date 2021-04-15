import {Link} from "react-router-dom";
import React from "react";

export default function HeaderLink(props) {
    return (
        <>
            {
                props.visible &&
                <li className={`headerLi ${props.isDropdown ? 'add-records-dropdown' : ''} ${props.floatRight ? 'rightLi' : ''}`} >
                    <Link to={props.path}>{props.lable}</Link>
                    {props.children}
                </li>
            }
        </>
    );
}