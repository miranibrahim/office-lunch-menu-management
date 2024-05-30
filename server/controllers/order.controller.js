const pool = require("../db/db");

exports.insertOrder = async (req, res) => {
  const { email, choice, date } = req.body;
  console.log(email);

  try {
    const result = await pool.query(
      `INSERT INTO orders (email, choice, date) VALUES ($1, $2, $3) RETURNING *`,
      [email, choice, date]
    );
    res.status(201).json({ message: "order completed", data: result.rows });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.individualOrders = async (req, res) => {
  const {email} = req.params;
  console.log(email)

  try {
    const result = await pool.query(`SELECT * FROM orders WHERE email = $1 ORDER BY date DESC`, [
      email,
    ]);
    res.status(200).json({ message: "Orders found", data: result.rows });
    console.log(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSearchedOrders = async (req, res) => {
    const { start, end } = req.query;
  
    if (!start || !end) {
      return res.status(400).json({ error: "Start and end dates are required" });
    }
    try {
      const result = await pool.query(
        `SELECT *
        FROM orders
        WHERE date BETWEEN $1 AND $2
        ORDER BY date;
        `,
        [start, end]
      );
  
      res.status(200).json({ message: "orders returned.", data: result.rows });
    } catch (error) {
      console.error("Error fetching order data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
