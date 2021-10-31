import React from 'react';
import './Header.scss';
import HeaderMainImage from '../graphics/background/header.png';

const Header: React.SFC = props => {
  return (
    <div className="ui container">
      <img className="ui centered huge image" src={HeaderMainImage} />
    </div>
  );
};

export default Header;
