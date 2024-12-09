import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <h1>Business Panel</h1>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.accent.navy};
  color: white;
`;

export default Navbar;
