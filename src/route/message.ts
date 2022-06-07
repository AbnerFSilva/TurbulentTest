import express = require("express");
const router = express.Router();

router.post("/create_message", async (req, res, context) => {
  const message = req.body;

  res.status(200).send();
});
router.get("/abner", async (req, res) => {
  res.status(200);
});
export { router as messageRoute };
