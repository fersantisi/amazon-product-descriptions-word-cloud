const express = require("express")
const router = express.Router()
const apiController = require("../controllers/apiController")

router.get("/urlQueue", apiController.list)
router.post("/urlQueue", apiController.enqueue)
router.get("/reset", apiController.resetJsons)

module.exports = router