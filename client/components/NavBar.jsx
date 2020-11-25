import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Navbar, Icon, NavItem } from 'react-materialize';




function NavBar() {
  return (
    <Wrapper>
      <Navbar
        alignLinks="right"
        id="mobile-nav"
        width="85%"
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
    </Wrapper>
  )
};

const Wrapper = styled.div`
display: flex;
margin-top: 60px;
`;

export default NavBar;

