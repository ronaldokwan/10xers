async function authorization(req, res, next) {
  try {
    if (req.user.admin === false) {
      throw { name: "You're not authorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
