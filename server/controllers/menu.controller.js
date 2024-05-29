const pool = require("../db/db");

exports.getAllMenu = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menus");
    res.status(200).json({ message: "Menu returned.", data: result.rows });
  } catch (error) {
    console.error("Error retrieving menu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSearchedMenu = async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "Start and end dates are required" });
  }
  try {
    const result = await pool.query(
      `SELECT *
      FROM menus
      WHERE date BETWEEN $1 AND $2
      ORDER BY date;
      `,
      [start, end]
    );

    res.status(200).json({ message: "Menu returned.", data: result.rows });
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.saveMenu = async (req, res) => {
  const { date, menu } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO menus (date, menu) VALUES ($1, $2) RETURNING *",
      [date, menu]
    );

    res.status(201).json({ message: "menu created.", data: result.rows });
  } catch (error) {
    console.error("Error saving menu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateMenu = async (req, res) => {
  const date = req.params.date;
  const { menu } = req.body;

  try {
    const result = await pool.query(
      "UPDATE menus SET menu=$1 WHERE date=$2 RETURNING *",
      [menu, date]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "menu not found." });
    }

    res.status(200).json({ message: "menu updated.", data: result.rows });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteMenu = async (req, res) => {
  const date = req.params.date;
  console.log(date);
  try {
    const result = await pool.query(`DELETE FROM menus WHERE date=$1 `, [date]);
    console.log(result);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Menu not found." });
    }

    res.status(200).json({ message: "Menu deleted.", data: result.rows });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
