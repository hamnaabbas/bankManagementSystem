import React from "react";
import styled from "styled-components";

const Badge = styled.div`
  background-color: ${(props) => (props.urgent ? "#fc2424" : "#5373fb")};
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const NotificationBadge = ({ message, urgent }) => {
  return <Badge urgent={urgent}>{message}</Badge>;
};

export default NotificationBadge;
