import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "hi",
  });
});

router.get("/me", (req, res) => {
  res.status(200).json({
    name: "John Doe",
    email: "john.doe@example.com",
  });
});

export default router;
