//businessTransaction
//invoice
const paginationMiddleware = (req, res, next) => {
    const { page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;
  
    req.pagination = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sort]: order === "asc" ? 1 : -1 },
    };
  
    next();
  };
  