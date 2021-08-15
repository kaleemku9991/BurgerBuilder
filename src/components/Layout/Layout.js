import React, {Component} from 'react';
import Au from '../../hoc/Au';
import LayoutCss from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

  state={
    showSideDrawer:false
  }
  sideDrawerCloseHandler = () =>{
    this.setState({showSideDrawer:false});
  }

  sideDrawerToggleHandler = () =>{
    this.setState((prevState)=>{
     return {showSideDrawer: !prevState.showSideDrawer}});
  }
  render(){
    return(
      <Au>
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer 
      open={this.state.showSideDrawer} 
      closed={this.sideDrawerCloseHandler} />
      <main className="Content" >
        {this.props.children}
      </main> 
    </Au>
    )
  }
}
export default Layout;