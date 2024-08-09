const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/hosts", require("./hosts"));
router.use("/properties", require("./properties"));
router.use("/amenities", require("./amenities"));
router.use("/bookings", require("./bookings"));
router.use("/reviews", require("./reviews"));

module.exports = router;
