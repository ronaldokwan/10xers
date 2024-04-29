const { User, Product, Order } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Op } = require("sequelize");

class Controller {
  static async home(req, res, next) {
    const data = await Product.findAll();
    res.status(200).json(data);
  }
  static async searchProduct(req, res, next) {
    try {
      const data = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      });
      if (data.length === 0) {
        throw { name: "Product not found" };
      }
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
      const data = await Order.findAll({
        where: { userId: req.user.id },
        include: {
          model: Product,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addOrder(req, res, next) {
    try {
      const { productId } = req.body;

      const dataProduct = await Product.findByPk(productId);
      if (!dataProduct) throw { name: "Product not found" };

      const userId = req.user.id;
      const data = await Order.create({
        userId,
        productId,
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }
  static async editOrder(req, res, next) {
    try {
      const orderId = req.params.id;
      const { productId } = req.body;

      const orderData = await Order.findByPk(orderId);
      if (!orderData) throw { name: "Order not found" };

      const productData = await Product.findByPk(productId);
      if (!productData) throw { name: "Product not found" };

      orderData.productId = productId;
      await orderData.save();

      res.status(200).json({ message: "Order has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteOrder(req, res, next) {
    try {
      const orderId = req.params.id;

      const data = await Order.findByPk(orderId);
      if (!data) throw { name: "Order not found" };
      await data.destroy();

      res.status(200).json({ message: "Order has been deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const { name, description, price, brand } = req.body;
      const data = await Product.create({
        name,
        description,
        price,
        brand,
      });

      res.status(201).json({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        brand: data.brand,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const { name, description, price, brand } = req.body;

      const data = await Product.findByPk(productId);
      if (!data) throw { name: "Product not found" };

      data.name = name;
      data.description = description;
      data.price = price;
      data.brand = brand;
      await data.save();

      res.status(200).json({ message: "Product has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;

      const data = await Product.findByPk(productId);
      if (!data) throw { name: "Product not found" };
      await data.destroy();

      res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async viewOrder(req, res, next) {
    try {
      const data = await Order.findAll({
        attributes: ["id"],
        include: {
          model: Product,
          attributes: ["id", "name", "description", "price", "brand"],
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
