import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Navbar, Icon, NavItem } from 'react-materialize';




function NavBar() {
  return (
    <Navbar
      alignLinks="right"
      id="mobile-nav"
      className="blue-grey darken-1"
      menuIcon={<Icon>Menu</Icon>}
      options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true
      }}
      search={true}
    >
    </Navbar>
  )
};

export default NavBar;

