import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Side>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/business-accounts">Accounts</Link></li>
        <li><Link to="/payroll">Payroll</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </Side>
  );
};

const Side = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  color: white;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.accent.green};
    font-weight: bold;
  }
`;

export default Sidebar;
