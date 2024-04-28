const express = require("express")
const router = express.Router()
const apiController = require("../controllers/apiController")

router.get("/urlQueue", apiController.list)
router.post("/urlQueue", apiController.enqueue)

module.exports = router