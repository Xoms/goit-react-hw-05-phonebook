import React from 'react';
import Navbar from "../../Navbar";
import './Layout.styles.scss';

const Layout = ({children}) => (
  <div className="layout">
    <Navbar />
    {children}
  </div>
);

export default Layout;
