const express = require("express")

const app = express()

const mainController = require("./mainController")

const PORT = 3000

app.listen(PORT, console.log(`Listening on port ${PORT} -> http://localhost:${PORT}`))

app.use(express.json());

app.set('views', './views')
app.set("view engine", "ejs")

app.get("/", mainController.helloWorld)