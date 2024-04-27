const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/", controller.cloud)
router.post("/", controller.updateCloud)

module.exports = router