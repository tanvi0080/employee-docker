const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, department } = req.body;

    const result = await pool.query(
      `INSERT INTO employees (name, email, department)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, department]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Unable to add employee" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete employee" });
  }
});

module.exports = router;