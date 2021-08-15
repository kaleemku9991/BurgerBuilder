import React from "react";
import ModalCss from "./Modal.css";
import Au from '../../../hoc/Au';
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
  <Au>
  <Backdrop show={props.show} clicked={props.modalClosed}/>
  <div style={{
    transform:props.show ? 'translateY(0)': 'translateY(-100vh)',
    opacity:props.show ? '1': '0'
  }} 
  className="Modal"> 
    {props.children}
  </div>
  </Au>

);

export default modal;