const { User } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);
    if (!data) throw { name: "Not Found" };
    if (req.user.admin === false && data.UserId !== req.user.id) {
      throw { name: "You're not authorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
