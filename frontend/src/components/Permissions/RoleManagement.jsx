import React, { useState } from "react";

const RoleManagement = () => {
  const [roles, setRoles] = useState(["Admin", "Finance Manager", "HR Manager"]);

  return (
    <div>
      <h2>Role Management</h2>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
