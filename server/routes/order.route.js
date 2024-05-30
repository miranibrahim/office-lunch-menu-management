const express = require("express");
const { insertOrder, individualOrders, getSearchedOrders } = require("../controllers/order.controller");
const orderRouter = express.Router();

orderRouter.post("/orders", insertOrder);
orderRouter.get("/orders/:email", individualOrders);
orderRouter.get("/orders", getSearchedOrders);


module.exports = orderRouter;
