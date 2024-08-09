const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("../middleware/auth");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.json(reviews);
});

router.post("/", authenticateToken, async (req, res) => {
  const review = await prisma.review.create({ data: req.body });
  res.status(201).json(review);
});

router.get("/:id", async (req, res) => {
  const review = await prisma.review.findUnique({
    where: { id: req.params.id },
  });
  if (!review) return res.sendStatus(404);
  res.json(review);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const review = await prisma.review.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(review);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await prisma.review.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
