import React from "react";
import ModalPortal from "./ModalPortal";
import './Modal.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import "font-awesome/css/font-awesome.min.css"

export default function Modal(props){

 function handleKeyDown(event) {
  if('Escape' === event.key) {
   props.onClose()
  }
 }

 return(
  <>
      {
          props.isOpen &&
          <ModalPortal>
              <div className="modalOverlay" >
                  <div className="modalWindow" onKeyDown={handleKeyDown} tabIndex="0">
                      <div className="modalHeader">
                          <div className="modalTitle">{props.title}</div>
                          <a onClick={props.onClose} href="#"><i className="bi-x fa-2x"/></a>
                      </div>
                      <div className="modalBody">
                          {props.children}

                      </div>
                      <div className="modalFooter">
                          <button onClick={props.onClose}>Cancel</button>
                          <button onClick={props.onSubmit}>Submit</button>
                      </div>
                  </div>
              </div>
          </ModalPortal>
      }
  </>
 );
}