const express = require("express");
const { saveMenu, updateMenu, deleteMenu, getSearchedMenu, getSingleMenu } = require("../controllers/menu.controller");
const menuRouter = express.Router();



menuRouter.get("/menus/:date", getSingleMenu);
menuRouter.get("/menus", getSearchedMenu);
menuRouter.post("/menus", saveMenu);
menuRouter.patch("/menus/:date", updateMenu);
menuRouter.delete("/menus/:date", deleteMenu);

module.exports = menuRouter;
