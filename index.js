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

app.post("/register", Controller.register);

app.use(authentication);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
