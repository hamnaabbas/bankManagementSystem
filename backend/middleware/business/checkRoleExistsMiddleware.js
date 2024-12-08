//rolePermission
const checkRoleExists = async (req, res, next) => {
    const role = await RolePermission.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    next();
  };
  