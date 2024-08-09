const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("../middleware/auth");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

router.post("/", authenticateToken, async (req, res) => {
  const property = await prisma.property.create({ data: req.body });
  res.status(201).json(property);
});

router.get("/:id", async (req, res) => {
  const property = await prisma.property.findUnique({
    where: { id: req.params.id },
  });
  if (!property) return res.sendStatus(404);
  res.json(property);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const property = await prisma.property.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(property);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await prisma.property.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
