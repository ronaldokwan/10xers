const { User, Product, Order } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async home(req, res, next) {
    try {
      const data = await Product.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password, admin } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };
      if (!admin) throw { name: "Admin is required" };

      const dataFind = await User.findOne({
        where: { email },
      });
      if (dataFind) throw { name: "Email already exist" };

      let temp = false;
      if (admin === "true") {
        temp = true;
      }
      const data = await User.create({
        email,
        password,
        admin: temp,
      });
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const data = await User.findOne({ where: { email } });
      if (!data) throw { name: "Invalid email/password" };

      const checkPassword = comparePassword(password, data.password);
      if (!checkPassword) throw { name: "Invalid email/password" };

      const payload = { id: data.id };
      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async getOrder(req, res, next) {
    try {
      const data = await Product.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addOrder(req, res, next) {
    try {
      const { title, content, tag } = req.body;
      const userId = req.user.id;
      const data = await Product.create({
        title,
        content,
        tag,
        userId,
      });

      res.status(201).json({
        id: data.id,
        title: data.title,
        content: data.content,
        tag: data.tag,
        userId: data.userId,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editOrder(req, res, next) {
    try {
      const id = req.params.id;
      const { title, content, tag } = req.body;

      const data = await Product.findByPk(id);
      if (!data) throw { name: "Product not found" };

      data.title = title;
      data.content = content;
      data.tag = tag;
      await data.save();

      res.status(200).json({ message: "Product has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteOrder(req, res, next) {
    try {
      const id = req.params.id;

      const data = await Product.findByPk(id);
      if (!data) throw { name: "Product not found" };
      await data.destroy();

      res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const { title, content, tag } = req.body;
      const userId = req.user.id;
      const data = await Product.create({
        title,
        content,
        tag,
        userId,
      });

      res.status(201).json({
        id: data.id,
        title: data.title,
        content: data.content,
        tag: data.tag,
        userId: data.userId,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const id = req.params.id;
      const { title, content, tag } = req.body;

      const data = await Product.findByPk(id);
      if (!data) throw { name: "Product not found" };

      data.title = title;
      data.content = content;
      data.tag = tag;
      await data.save();

      res.status(200).json({ message: "Product has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;

      const data = await Product.findByPk(id);
      if (!data) throw { name: "Product not found" };
      await data.destroy();

      res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
