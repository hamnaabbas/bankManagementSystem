//businesstransaction
const Joi = require("joi");

const transactionValidation = (req, res, next) => {
  const transactionSchema = Joi.object({
    business_id: Joi.string().required(),
    amount: Joi.number().positive().required(),
    transaction_type: Joi.string().valid("credit", "debit").required(),
    related_transactions: Joi.array().items(
      Joi.object({
        transaction_id: Joi.string().required(),
        relation_type: Joi.string().valid("parent", "child", "linked").required(),
      })
    ),
    description: Joi.string().max(255).optional(),
    created_by: Joi.string().required(),
  });

  const { error } = transactionSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map((err) => err.message) });
  }
  next();
};
const batchTransactionValidation = (req, res, next) => {
    const batchSchema = Joi.array().items(
      Joi.object({
        business_id: Joi.string().required(),
        amount: Joi.number().positive().required(),
        transaction_type: Joi.string().valid("credit", "debit").required(),
        related_transactions: Joi.array().items(
          Joi.object({
            transaction_id: Joi.string().required(),
            relation_type: Joi.string().valid("parent", "child", "linked").required(),
          })
        ),
        description: Joi.string().max(255).optional(),
        created_by: Joi.string().required(),
      })
    );
  
    const { error } = batchSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
  };
  