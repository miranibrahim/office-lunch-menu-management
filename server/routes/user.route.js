const express = require("express");
const userRouter = express.Router();
const { saveUser, getUser, updateUser } = require("../controllers/user.controller");


userRouter.get("/users", getUser);
userRouter.post("/users", saveUser);
userRouter.patch("/users/:email", updateUser);

module.exports = userRouter;
