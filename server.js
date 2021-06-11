const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/Register");
const { handleSignin } = require("./controllers/signin");
const { handleProfile } = require("./controllers/profile");
const { handleImage, handleAPIcall } = require("./controllers/image");
const dotenv = require ('dotenv');
dotenv.config()
var pass = process.env.DATABASE_PASS;
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send();
});
app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  handleProfile(req, res, db);
});
app.put("/image", (req, res) => {
  handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  handleAPIcall(req, res);
});

app.listen(process.env.PORT ||  3000, () => {
  console.log("hey its working!");
});
