const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authenticateToken } = require("../middleware/auth");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const hosts = await prisma.host.findMany();
  res.json(hosts);
});

router.post("/", authenticateToken, async (req, res) => {
  const host = await prisma.host.create({ data: req.body });
  res.status(201).json(host);
});

router.get("/:id", async (req, res) => {
  const host = await prisma.host.findUnique({ where: { id: req.params.id } });
  if (!host) return res.sendStatus(404);
  res.json(host);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const host = await prisma.host.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(host);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await prisma.host.delete({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
