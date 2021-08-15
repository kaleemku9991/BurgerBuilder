import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SideDarwerCss from "./sideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Au from "../../../hoc/Au";

const sideDrawer = (props) => {
  let attachedClass=["SideDrawer","Close"];
  if(props.open){
    attachedClass=["SideDrawer","Open"];
  }

  return (
    <Au>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClass.join(' ')}>
        <div className="Logo2">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>

      </div>
    </Au>
  );
};

export default sideDrawer;