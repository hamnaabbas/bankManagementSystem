//businesspayroll
const Employee = require("../../models/customer/accountModel");

const validateEmployeeIds = async (req, res, next) => {
  try {
    const employeeIds = req.body.employee_list.map((employee) => employee.employee_id);
    const employees = await Employee.find({ _id: { $in: employeeIds } });

    if (employees.length !== employeeIds.length) {
      return res.status(400).json({ error: "One or more employee IDs are invalid." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error while validating employee IDs." });
  }
};
