//analytics
exports.validateQueryParams = (req, res, next) => {
    const { format } = req.query;
  
    if (format && format !== "chart") {
      return res.status(400).json({ error: "Invalid format query parameter" });
    }
  
    next();
  };
  //businessacount
  exports.validateQueryParams1 = (req, res, next) => {
    const { status } = req.query;
  
    if (status && !["active", "suspended", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status filter" });
    }
  
    next();
  };
    