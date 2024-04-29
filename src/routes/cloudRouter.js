const express = require("express")
const router = express.Router()
const cloudController = require("../controllers/cloudController")

router.get("/", cloudController.updateCloud)
//router.post("/", cloudController.updateCloud)

module.exports = router