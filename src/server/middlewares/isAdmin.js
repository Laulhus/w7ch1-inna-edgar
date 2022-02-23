const isAdmin = (req, res, next) => {
  const { admin } = req.body;
  if (admin) {
    next();
  } else {
    const error = new Error("Access not allowed");
    error.code = 403;
    next(error);
  }
};

module.exports = isAdmin;
