const router = require("express").Router();

module.exports = (db) => {
  // BROWSE GET /orders/:user_id  "Show all user Orders"
  router.get("/orders/:id", (req, res) => {
    const queryParams = [req.params.id];
    db.query(`SELECT * FROM orders WHERE user_id = $1`, queryParams)
      .then((result) => {
        result.rows.length
          ? res.json(result.rows)
          : res.json({
              message: `no order found with id: ${req.params.id}`,
            });
      })
      .catch((err) => res.status(401).json({ error: err.message }));
  });

  // READ GET /order/:order_id  "Show a Specific Order"
  router.get("/order/:id", (req, res) => {
    const queryParams = [req.params.id];
    db.query(`SELECT * FROM orders WHERE id = $1`, queryParams)
      .then((result) => {
        result.rows.length
          ? res.json(result.rows)
          : res.json({
              message: `no order found with id: ${req.params.id}`,
            });
      })
      .catch((err) => res.status(401).json({ error: err.message }));
  });

  // ADD POST /order/  "Add New Order"
  router.post("/order/:id", (req, res) => {
    // Getting order values as a JSON file
    const queryParams = [req.params.id];
    db.query(
      `INSERT INTO orders (time_created, total_price, completed, user_id) VALUES (date_trunc('second', current_timestamp), 0, false, $1);`,
      queryParams
    )
      .then(() => res.json({ message: "order added!" }))
      .catch((err) => res.status(401).json({ error: err.message }));
  });

  return router;
};
