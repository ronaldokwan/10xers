const request = require("supertest");
const app = require("../index");
const { User, Product, Order } = require("../models");
const { signToken } = require("../helpers/jwt");

let token;
beforeAll(async () => {
  let user = await User.create({
    email: "user@gmail.com",
    password: "user",
    admin: "false",
  });
  token = signToken({ id: user.id });

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

describe("GET /order", () => {
  test("get orders", async () => {
    const response = await request(app)
      .get("/order")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("userId");
    expect(response.body[0]).toHaveProperty("productId");
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .get("/order")
      .set("Authorization", `Bearer`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("POST /order", () => {
  test("add orders", async () => {
    const response = await request(app)
      .post("/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("userId");
    expect(response.body.data).toHaveProperty("productId");
  });
  test("product not found", async () => {
    const response = await request(app)
      .post("/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 100,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
  test("product not found", async () => {
    const response = await request(app)
      .post("/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 100,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .post("/order")
      .set("Authorization", `Bearer`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("PATCH /edit-order/:id", () => {
  test("Edit Order", async () => {
    const response = await request(app)
      .patch(`/edit-order/${1}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 2,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Order has been updated");
  });
  test("order not found", async () => {
    const response = await request(app)
      .patch(`/edit-order/${100}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 2,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Order not found");
  });
  test("product not found", async () => {
    const response = await request(app)
      .patch(`/edit-order/${1}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 100,
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .patch(`/edit-order/${1}`)
      .set("Authorization", `Bearer`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});

describe("DELETE /delete-order/:id", () => {
  test("delete Order", async () => {
    const response = await request(app)
      .delete(`/delete-order/${1}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Order has been deleted");
  });
  test("order not found", async () => {
    const response = await request(app)
      .delete(`/delete-order/${100}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Order not found");
  });
  test("Invalid Token", async () => {
    const response = await request(app)
      .delete(`/delete-order/${1}`)
      .set("Authorization", `Bearer`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
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
