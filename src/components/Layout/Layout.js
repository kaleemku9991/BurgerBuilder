import React from 'react';
import Au from '../../hoc/Au';
import LayoutCss from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
  <Au>
    <Toolbar/>
    <SideDrawer/>
    <main className="Content">
      {props.children}
    </main> 
  </Au>
);
export default layout;