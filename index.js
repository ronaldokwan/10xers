require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const Controller = require("./controllers/controller");
const errHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", Controller.home);
app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.use(authentication);

app.get("/order", Controller.getOrder);
app.post("/order", Controller.addOrder);
app.patch("/edit-order/:id", Controller.editOrder);
app.delete("/delete-order/:id", Controller.deleteOrder);

app.post("/add-product", authorization, Controller.addProduct);
app.put("/edit-product/:id", authorization, Controller.editProduct);
app.delete("/delete-product/:id", authorization, Controller.deleteProduct);
app.get("/view-order", authorization, Controller.viewOrder);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
