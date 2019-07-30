import React from 'react';
import PropTypes from 'prop-types';
//import MenuItem from '../MenuItem';
import {Link} from 'react-router-dom';

import './SideMenu.css';

const SideMenu = (props) => {
  const { opened } = props;
  const cssClasses = opened ? 'side-menu open' : 'side-menu';

  return (
    <nav className={ cssClasses }>
      <ul>
      <li><Link to="/createCourse"><i className="fa fa-circle-o"></i> Create Course</Link></li>
      <li><Link to="/genCode"><i className="fa fa-circle-o"></i> Generate Code </Link></li>

      </ul>
    </nav>
  );
};

SideMenu.propTypes = {
  menuItems: PropTypes.array,
  opened: PropTypes.bool,
};

SideMenu.defaultProps = {
  menuItems: [],
  opened: false,
};

export default SideMenu;
