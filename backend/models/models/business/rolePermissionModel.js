const mongoose = require("mongoose");

// Define permissions for each role
const rolePermissionsMap = {
  Admin: [
    "view-transactions",
    "process-payroll",
    "manage-accounts",
    "create-invoice",
    "approve-loan",
    "manage-users",
    "generate-reports",
  ],
  "Finance Officer": [
    "view-transactions",
    "process-payroll",
    "create-invoice",
    "generate-reports",
  ],
  "HR Manager": [
    "view-transactions",
    "process-payroll",
    "manage-users",
  ],
  "Custom Role": [
    // Custom permissions can be specified when creating a role
  ],
};

// Define RolePermission Schema
const rolePermissionSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: [true, "Business ID is required!"],
    },
    role_name: {
      type: String,
      required: [true, "Role name is required!"],
      enum: Object.keys(rolePermissionsMap),
    },
    permissions: {
      type: [String],
      required: [true, "Permissions are required!"],
      validate: {
        validator: function (value) {
          // Ensure that only valid permissions are assigned to a role
          const allowedPermissions = rolePermissionsMap[this.role_name];
          return allowedPermissions.includes("*") || value.every(permission => allowedPermissions.includes(permission));
        },
        message: props => `Invalid permissions for the ${props.instance.role_name} role.`,
      },
    },
    assigned_users: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        email: { type: String, required: true },
        status: {
          type: String,
          enum: ["active", "inactive", "pending"],
          default: "active",
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "Roles",
  }
);

// Create the RolePermission model
const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

// Export the model
module.exports = RolePermission;
