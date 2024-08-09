const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("../middleware/auth");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const bookings = await prisma.booking.findMany();
  res.json(bookings);
});

router.post("/", authenticateToken, async (req, res) => {
  const booking = await prisma.booking.create({ data: req.body });
  res.status(201).json(booking);
});

router.get("/:id", async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
  });
  if (!booking) return res.sendStatus(404);
  res.json(booking);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(booking);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await prisma.booking.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
