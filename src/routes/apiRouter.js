const express = require("express")
const router = express.Router()
const apiController = require("../controllers/apiController")

router.get("/urlQueue", apiController.listQueue)
router.get("/wordMap", apiController.listWords)
router.post("/urlQueue", apiController.enqueue)
router.get("/reset", apiController.resetJsons)

module.exports = router