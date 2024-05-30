const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user.route");
const menuRouter = require("./routes/menu.route");
const orderRouter = require("./routes/order.route");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRouter);
app.use(menuRouter);
app.use(orderRouter);

app.get("/", (req, res) => {
  res.json({ message: "[server is running]" });
});
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
