const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("../middleware/auth");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const amenities = await prisma.amenity.findMany();
  res.json(amenities);
});

router.post("/", authenticateToken, async (req, res) => {
  const amenity = await prisma.amenity.create({ data: req.body });
  res.status(201).json(amenity);
});

router.get("/:id", async (req, res) => {
  const amenity = await prisma.amenity.findUnique({
    where: { id: req.params.id },
  });
  if (!amenity) return res.sendStatus(404);
  res.json(amenity);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const amenity = await prisma.amenity.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(amenity);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await prisma.amenity.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
