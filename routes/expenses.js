const express = require("express");
const sql = require("mssql");

const router = express.Router();

router.get("/", async (req, res) => {
  await sql.connect(process.env.DB_CONNECTION);

  const result = await sql.query`select * from expenses`;

  res.json(result.recordset);
});

router.post("/add", async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONNECTION);

    const result = await pool
      .request()
      .input("title", sql.VarChar, req.body.title)
      .input("amount", sql.Decimal, req.body.amount)
      .input("date", sql.Date, req.body.date)
      .query(
        "INSERT INTO expenses (title, amount, date) VALUES (@title, @amount, @date)"
      );

    res.send("Expense added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/test", (req, res) => {
  res.json({ test: "test" });
});

router.post("/test", (req, res) => {
  res.json({ test: "test" });
});

module.exports = router;
