// const request = require("supertest");
// const app = require("../index");
// const { User } = require("../models");
// const { signToken } = require("../helpers/jwt");

// let token;
// beforeAll(async () => {
//   let user = await User.create({
//     email: "user@gmail.com",
//     password: "user",
//     admin: "false",
//   });
//   token = signToken({ id: user.id });
// });

// describe("GET /", () => {
//   test("get products", async () => {
//     const response = await request(app).get("/");
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//     response.body.forEach((product) => {
//       expect(product).toHaveProperty("name");
//       expect(product).toHaveProperty("description");
//       expect(product).toHaveProperty("price");
//       expect(product).toHaveProperty("brand");
//     });
//   });
// });

// afterAll(async () => {
//   await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
// });
