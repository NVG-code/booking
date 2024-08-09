const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("../middleware/auth");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/", authenticateToken, async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.status(201).json(user);
});

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) return res.sendStatus(404);
  res.json(user);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(user);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
