import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../assets/images/logo/Logo-redeflex.svg';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
			  {/* <img alt="user" src={logo} style={{ height: '15px' }} /> */}
            </Link>
          </h3>
        </div>
      ) : (
		  <h3>
            <Link to="/dashboard">
			  {/* <img alt="user" src={logo} style={{ height: '40px' }} /> */}
            </Link>
        </h3>
      )}
    </div>
  );
};
