const { Note } = require("../models");

async function authorization(req, res, next) {
  try {
    const data = await Note.findByPk(req.params.id);
    if (!data) throw { name: "Note not found" };
    if (data.userId !== req.user.id) throw { name: "You're not authorized" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
