const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const pool = require("../db/db");


exports.getUser = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ message: "Users are returned.", data: result.rows });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const id = uuidv4();

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Saving with the hashed password
    const result = await pool.query(
      "INSERT INTO users (u_id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, username, email, hashedPassword, role]
    );

    res.status(201).json({ message: "User created.", data: result.rows });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const email = req.params.email;
  const {role} = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET role=$1 WHERE email=$2 RETURNING *",
      [role, email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User role updated.", data: result.rows[0] });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
