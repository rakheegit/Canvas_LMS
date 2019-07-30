import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const MenuItem = (props) => {
  const { label, link, icon, onDrawerToggleClick } = props;
  return (
    <li>
      <Link to={ link } onClick={ onDrawerToggleClick }>
      <i className={icon}></i> <span>{label}</span>
      </Link>
    </li>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
};

MenuItem.defaultProps = {
  label: 'Label',
  link: '/',
};

export default MenuItem;