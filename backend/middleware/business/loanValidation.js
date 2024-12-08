//businessloan
const Joi = require("joi");

const loanValidation = (req, res, next) => {
  const schema = Joi.object({
    business_id: Joi.string().required(),
    loan_amount: Joi.number().positive().required(),
    interest_rate: Joi.number().positive().required(),
    repayment_schedule: Joi.array().items(
      Joi.object({
        due_date: Joi.date().required(),
        amount: Joi.number().positive().required(),
      })
    ).required(),
    loan_status: Joi.string().valid("pending", "approved", "rejected").default("pending"),
    created_by: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};
