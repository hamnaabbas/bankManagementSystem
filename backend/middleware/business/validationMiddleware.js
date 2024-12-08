//analytics
exports.validateAnalyticsData = (req, res, next) => {
    const { income, expenses, business_id } = req.body;
  
    if (typeof income !== "number" || income < 0) {
      return res.status(400).json({ error: "Income must be a non-negative number" });
    }
  
    if (typeof expenses !== "number" || expenses < 0) {
      return res.status(400).json({ error: "Expenses must be a non-negative number" });
    }
  
    if (!business_id) {
      return res.status(400).json({ error: "Business ID is required" });
    }
  
    next();
  };
  //businessaccount
  exports.validateBusinessAccountData = (req, res, next) => {
    const { business_name, business_id, linked_accounts } = req.body;
  
    if (!business_name || typeof business_name !== "string") {
      return res.status(400).json({ error: "Business name is required and must be a string" });
    }
  
    if (!business_id || typeof business_id !== "string") {
      return res.status(400).json({ error: "Business ID is required and must be a string" });
    }
  
    if (linked_accounts && !Array.isArray(linked_accounts)) {
      return res.status(400).json({ error: "Linked accounts must be an array" });
    }
  
    linked_accounts?.forEach((account, index) => {
      if (!account.account_id || typeof account.account_id !== "string") {
        return res.status(400).json({ error: `Linked account at index ${index} is missing a valid account_id` });
      }
      if (!account.account_name || typeof account.account_name !== "string") {
        return res.status(400).json({ error: `Linked account at index ${index} is missing a valid account_name` });
      }
      if (typeof account.balance !== "number" || account.balance < 0) {
        return res.status(400).json({ error: `Linked account at index ${index} has an invalid balance` });
      }
    });
  
    next();
  };
    //businesspayroll
    const Joi = require("joi");

const payrollValidation = (req, res, next) => {
  const schema = Joi.object({
    business_id: Joi.string().required(),
    payroll_cycle: Joi.string().valid("weekly", "bi-weekly", "monthly").required(),
    employee_list: Joi.array().items(
      Joi.object({
        employee_id: Joi.string().required(),
        salary: Joi.number().positive().required(),
      })
    ).required(),
    created_by: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};
//businessloan
const validateRepaymentSchedule = (req, res, next) => {
  const { loan_amount, repayment_schedule } = req.body;

  const totalRepayment = repayment_schedule.reduce((total, schedule) => total + schedule.amount, 0);

  if (totalRepayment !== loan_amount) {
    return res.status(400).json({ error: "Repayment schedule total must match loan amount." });
  }

  next();
};
//invoice

const invoiceValidation = (req, res, next) => {
  const invoiceSchema = Joi.object({
    business_id: Joi.string().required(),
    invoice_number: Joi.string().required(),
    amount: Joi.number().positive().required(),
    due_date: Joi.date().required(),
    status: Joi.string().valid("pending", "paid", "overdue").default("pending"),
    description: Joi.string().max(255).optional(),
    created_by: Joi.string().required(),
  });

  const { error } = invoiceSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map((err) => err.message) });
  }
  next();
};
//request

const requestValidationMiddleware = (req, res, next) => {
  const requestSchema = Joi.object({
    user_id: Joi.string().required(),
    request_type: Joi.string().valid('account-creation', 'role-change', 'balance-adjustment').required(),
    details: Joi.string().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected').optional().default('pending'),
    handled_by: Joi.string().optional(),
  });

  const { error } = requestSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map((err) => err.message) });
  }
  next();
};

//rolepermission

const roleValidationMiddleware = (req, res, next) => {
  const roleSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).optional(),
    business_id: Joi.string().required(),
  });

  const { error } = roleSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map((err) => err.message) });
  }
  next();
};

