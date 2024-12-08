//analytics
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  };
  //businessaccount

const errorHandler1 = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
};

module.exports = { errorHandler1 };
