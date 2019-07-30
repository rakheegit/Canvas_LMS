import React, { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';
import SideMenu from './SideMenu'

class Home extends Component {
 
  state = {
    sideDrawerVisible: false,
  }

handleDrawerToggleClick = () => {
  this.setState(prevState => ({
    sideDrawerVisible: !prevState.sideDrawerVisible,
  }));
}

handleBackdropClick = () => {
  this.setState({
    sideDrawerVisible: false,
  });
}

  render() {
    const { sideDrawerVisible } = this.state;
    return (
      <div >
<Header />
<SideBar  onDrawerToggleClick={ this.handleDrawerToggleClick } />
{sideDrawerVisible
  ? (

      <SideMenu  opened={ sideDrawerVisible } />

  ) : null
}
<Content />
      </div>
    );
  }
}

export default Home;