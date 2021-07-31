const router = require("express").Router();
const api = require("./api/api");
const views = require("./api/views")

router.use("/api", api);
router.use("/", views);

module.exports = router;