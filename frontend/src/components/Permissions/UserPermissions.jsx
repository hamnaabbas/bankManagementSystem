import React, { useState } from "react";

const UserPermission = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, role: "Admin", accessLevel: "Full" },
    { id: 2, role: "HR Manager", accessLevel: "Limited" },
  ]);

  return (
    <div>
      <h2>User Permissions</h2>
      <ul>
        {permissions.map((perm) => (
          <li key={perm.id}>
            {perm.role}: {perm.accessLevel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPermission;
