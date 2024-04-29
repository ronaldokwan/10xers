const request = require("supertest");
const app = require("../index");
const { User, Product, Order } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

let token;
let tokenAdmin;
beforeAll(async () => {
  let user = await User.create({
    email: "user@gmail.com",
    password: "user",
    admin: "false",
  });
  token = signToken({ id: user.id });

  let admin = await User.create({
    email: "admin@gmail.com",
    password: "admin",
    admin: "true",
  });
  tokenAdmin = signToken({ id: admin.id });

  await Product.create({
    name: "Samsung Galaxy A10",
    description: "Samsung Galaxy A10",
    price: 2000000,
    brand: "Samsung",
  });

  await Product.create({
    name: "Samsung Galaxy A20",
    description: "Samsung Galaxy A20",
    price: 4000000,
    brand: "Samsung",
  });

  await Order.create({
    userId: 1,
    productId: 1,
  });
});

describe("POST /add-product", () => {
  test("add product", async () => {
    const response = await request(app)
      .post("/add-product")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        name: "Samsung Galaxy A30",
        description: "Samsung Galaxy A30",
        price: 6000000,
        brand: "Samsung",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("brand");
  });
  test("validation", async () => {
    const response = await request(app)
      .post("/add-product")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        name: "Samsung Galaxy A30",
        price: 6000000,
        brand: "Samsung",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "description cannot be null"
    );
  });
  test("unique validation", async () => {
    const response = await request(app)
      .post("/add-product")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        name: "Samsung Galaxy A30",
        description: "Samsung Galaxy A30",
        price: 6000000,
        brand: "Samsung",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "name must be unique");
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .post("/add-product")
      .set("Authorization", `Bea asd`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
  test("Not admin", async () => {
    const response = await request(app)
      .post("/add-product")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Samsung Galaxy A40",
        description: "Samsung Galaxy A40",
        price: 6000000,
        brand: "Samsung",
      });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "You're not authorized");
  });
});

describe("PUT /edit-product/:id", () => {
  test("edit product", async () => {
    const response = await request(app)
      .put(`/edit-product/${1}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        name: "linux",
        description: "linux",
        price: 2000000,
        brand: "fedora",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Product has been updated");
  });
  test("validation", async () => {
    const response = await request(app)
      .put(`/edit-product/${1}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        name: "Samsung Galaxy A30",
        price: 6000000,
        brand: "Samsung",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "description cannot be null"
    );
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .put(`/edit-product/${1}`)
      .set("Authorization", `Bearer awd`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
  test("Not admin", async () => {
    const response = await request(app)
      .put(`/edit-product/${1}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Samsung Galaxy A40",
        description: "Samsung Galaxy A40",
        price: 6000000,
        brand: "Samsung",
      });
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "You're not authorized");
  });
  test("Product not found", async () => {
    const response = await request(app)
      .put(`/edit-product/${100}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        name: "Samsung Galaxy A40",
        description: "Samsung Galaxy A40",
        price: 6000000,
        brand: "Samsung",
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
});

describe("DELETE /delete-product/:id", () => {
  test("delete product", async () => {
    const response = await request(app)
      .delete(`/delete-product/${2}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Product has been deleted");
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .delete(`/delete-product/${1}`)
      .set("Authorization", ``);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
  test("Not admin", async () => {
    const response = await request(app)
      .delete(`/delete-product/${1}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "You're not authorized");
  });
});

describe("GET /view-order", () => {
  test("get order", async () => {
    const response = await request(app)
      .get(`/view-order`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
    expect(response.body[0].Product).toHaveProperty("name");
    expect(response.body[0].Product).toHaveProperty("description");
    expect(response.body[0].Product).toHaveProperty("price");
    expect(response.body[0].Product).toHaveProperty("brand");
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .get(`/view-order`)
      .set("Authorization", `Bearer`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
  test("Not admin", async () => {
    const response = await request(app)
      .get(`/view-order`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "You're not authorized");
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Product.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Order.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
