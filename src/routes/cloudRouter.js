const express = require("express")
const router = express.Router()
const cloudController = require("../controllers/cloudController")

router.get("/", cloudController.updateCloud)
router.get("/reset", cloudController.resetJsons)

module.exports = router