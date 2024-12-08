const RolePermission = require("../../models/business/rolePermissionModel");

const rolePermissionController = {
  async create(req, res) {
    try {
      const role = await RolePermission.create(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const roles = await RolePermission.find().populate("business_id");
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const role = await RolePermission.findById(req.params.id).populate("business_id");
      if (!role) return res.status(404).json({ error: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const role = await RolePermission.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!role) return res.status(404).json({ error: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const role = await RolePermission.findByIdAndDelete(req.params.id);
      if (!role) return res.status(404).json({ error: "Role not found" });
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async assignRole(req, res) {
    try {
      const { roleId, userId, status } = req.body;
      const role = await RolePermission.findById(roleId);
      if (!role) return res.status(404).json({ error: "Role not found" });

      role.assigned_users.push({ user_id: userId, status });
      await role.save();
      res.status(200).json({ message: "User assigned to role successfully", role });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async revokeRole(req, res) {
    try {
      const { roleId, userId } = req.body;
      const role = await RolePermission.findById(roleId);
      if (!role) return res.status(404).json({ error: "Role not found" });

      role.assigned_users = role.assigned_users.filter(user => user.user_id.toString() !== userId);
      await role.save();
      res.status(200).json({ message: "User role revoked successfully", role });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = rolePermissionController;
