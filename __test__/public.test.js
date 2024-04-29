const request = require("supertest");
const app = require("../index");
const { User, Product, Order } = require("../models");

beforeAll(async () => {
  await Product.create({
    name: "Samsung Galaxy A10",
    description: "Samsung Galaxy A10",
    price: 2000000,
    brand: "Samsung",
  });
});

describe("GET /", () => {
  test("get products", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((product) => {
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("brand");
    });
  });
});
describe("GET /search", () => {
  test("search product", async () => {
    const response = await request(app).get("/search?search=Samsung");
    expect(response.status).toBe(200);
    response.body.forEach((product) => {
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("brand");
    });
  });
  test("Product not found", async () => {
    const response = await request(app).get("/search?search=burger");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
});

describe("POST /register", () => {
  test("Success register user", async () => {
    const userData = {
      email: "user@gmail.com",
      password: "user",
      admin: "false",
    };

    const adminData = {
      email: "admin@gmail.com",
      password: "admin",
      admin: "true",
    };

    const responseUser = await request(app).post("/register").send(userData);
    expect(responseUser.status).toBe(201);
    expect(responseUser.body).toHaveProperty("id", expect.any(Number));
    expect(responseUser.body).toHaveProperty("email", userData.email);

    const responseAdmin = await request(app).post("/register").send(adminData);
    expect(responseAdmin.status).toBe(201);
    expect(responseAdmin.body).toHaveProperty("id", expect.any(Number));
    expect(responseAdmin.body).toHaveProperty("email", adminData.email);
  });
  test("Email is null", async () => {
    const dummyData = {
      password: "user",
      admin: "false",
    };
    const response = await request(app).post("/register").send(dummyData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
  test("Password is null", async () => {
    const dummyData = {
      email: "user1@gmail.com",
      admin: "false",
    };
    const response = await request(app).post("/register").send(dummyData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
  test("admin is null", async () => {
    const dummyData = {
      email: "user1@gmail.com",
      password: "user",
    };
    const response = await request(app).post("/register").send(dummyData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Admin is required");
  });
  test("Password length less than 4 or greater than 20", async () => {
    const dummyData = {
      email: "staff1@gmail.com",
      password: "123",
      admin: "false",
    };
    const response = await request(app).post("/register").send(dummyData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Password length should be between 4 and 20 characters"
    );
  });
  test("Email already exist", async () => {
    const dummyData = {
      email: "user@gmail.com",
      password: "user",
      admin: "false",
    };
    const response = await request(app).post("/register").send(dummyData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Email already exist");
  });
  test("Not a valid Email", async () => {
    const dummyData = {
      email: "userGmail.com",
      password: "user",
      admin: "false",
    };
    const response = await request(app).post("/register").send(dummyData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email format is not correct"
    );
  });
});

describe("POST /login", () => {
  test("Success login user", async () => {
    const userData = {
      email: "user@gmail.com",
      password: "user",
    };

    const adminData = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const responseUser = await request(app).post("/login").send(userData);
    expect(responseUser.status).toBe(200);
    expect(responseUser.body).toHaveProperty(
      "access_token",
      expect.any(String)
    );

    const responseAdmin = await request(app).post("/login").send(adminData);
    expect(responseAdmin.status).toBe(200);
    expect(responseUser.body).toHaveProperty(
      "access_token",
      expect.any(String)
    );
  });
  test("Email required", async () => {
    const dummyData = {
      password: "user",
    };
    const response = await request(app).post("/login").send(dummyData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
  test("Password required", async () => {
    const dummyData = {
      email: "user@gmail.com",
    };
    const response = await request(app).post("/login").send(dummyData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
  test("Invalid Email", async () => {
    const dummyData = {
      email: "useRail.com",
      password: "user",
    };
    const response = await request(app).post("/login").send(dummyData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
  test("Invalid Password", async () => {
    const dummyData = {
      email: "user@gmail.com",
      password: "user123",
    };
    const response = await request(app).post("/login").send(dummyData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Product.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Order.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
