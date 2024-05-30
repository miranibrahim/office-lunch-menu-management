const express = require("express");
const userRouter = express.Router();
const { saveUser, getUser, updateUser, getSingleUser } = require("../controllers/user.controller");


userRouter.get("/users", getUser);
userRouter.get("/users/:email", getSingleUser);
userRouter.post("/users", saveUser);
userRouter.patch("/users/:email", updateUser);

module.exports = userRouter;
