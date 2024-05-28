const express = require("express");
const { getMenu, saveMenu, updateMenu, deleteMenu } = require("../controllers/menu.controller");
const menuRouter = express.Router();



menuRouter.get("/menus", getMenu);
menuRouter.post("/menus", saveMenu);
menuRouter.patch("/menus/:date", updateMenu);
menuRouter.delete("/menus/:date", deleteMenu);

module.exports = menuRouter;
