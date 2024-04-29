const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Invalid token" };

    const [type, access_token] = authorization.split(" ");
    if (type !== "Bearer") throw { name: "Invalid token" };

    const verify = verifyToken(access_token);
    if (!verify) throw { name: "Invalid token" };

    const data = await User.findByPk(verify.id);
    if (!data) throw { name: "Invalid token" };

    req.user = data;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
