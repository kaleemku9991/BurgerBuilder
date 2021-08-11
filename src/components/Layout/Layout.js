import React from 'react';
import Au from '../../hoc/Au';
import LayoutCss from './Layout.css';

const layout = (props) => (
  <Au>
    <div>Toolbar,Sidedrawer,Backdrop</div>
    <main className="Content">
      {props.children}
    </main> 
  </Au>
);
export default layout;