//requests
const filterRequestsMiddleware = (req, res, next) => {
    const { user_id, status } = req.query;
    const filter = {};
  
    if (user_id) filter.user_id = user_id;
    if (status) filter.status = status;
  
    req.filter = filter;
    next();
  };
  