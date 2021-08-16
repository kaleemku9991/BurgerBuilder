import React, { Component } from "react";
import ModalCss from "./Modal.css";
import Au from '../../../hoc/Au';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  componentDidUpdate(){
    console.log("Modal will update");
  }

  render(){
    return(
      <Au>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div style={{
        transform:this.props.show ? 'translateY(0)': 'translateY(-100vh)',
        opacity:this.props.show ? '1': '0'
      }} 
      className="Modal"> 
        {this.props.children}
      </div>
      </Au>
    );
  }
};
export default Modal;