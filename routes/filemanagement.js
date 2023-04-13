const express = require("express");
const sql = require("mssql");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const rows = req.body.rows;
    console.log(rows);
    const columns = rows[0];
    const data = rows.slice(1);
    console.log(columns);

    await sql.connect(process.env.DB_CONNECTION);

    //const result = await sql.query`select * from expenses`;

    data.forEach((row) => {
      const values = row.map((value) => `'${value}'`).join(",");
      sql.query(
        `INSERT INTO expenses (${columns.join(", ")}) VALUES (${values})`
      );
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error processing Excel data:", error);
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
