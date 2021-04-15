import React, {useEffect, useRef} from "react";
import ModalPortal from "./ModalPortal";
import './Modal.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import "font-awesome/css/font-awesome.min.css"

export default function Modal(props) {

    // Фокус окна модалки
    // const mounted = useRef();
    // useEffect(() => {
    //     if (!mounted.current) {
    //         // do componentDidMount logic
    //     } else {
    //         setFocus();
    //     }
    // });
    //
    // function setFocus(){
    //     document.getElementById("modalWindowId").focus();
    // }

    function handleKeyDown(event) {
        if ('Escape' === event.key) {
            props.onClose()
        }
    }

    let weight = {
        width: props.weight ? props.weight : '500px'
    }

    return (
        <>
            {
                props.isOpen &&
                <ModalPortal>
                    <div className="modalOverlay">
                        <div className="modalWindow" onKeyDown={handleKeyDown} tabIndex="0" style={weight} id="modalWindowId">
                            <div className="modalHeader">
                                <div className="modalTitle">{props.title}</div>
                                <a onClick={props.onClose} href="#"><i className="bi-x fa-2x"/></a>
                            </div>
                            <div className="modalBody">
                                {props.children}
                            </div>
                            <div className="modalFooter">
                                <button onClick={props.onClose}>Cancel</button>
                                {props.onSubmit && <button onClick={props.onSubmit}>Submit</button>}
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            }
        </>
    );
}