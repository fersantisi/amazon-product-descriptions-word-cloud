const express = require("express")
const app = express()
const router = require("./router")

const PORT = 3000

app.listen(PORT, console.log(`Listening on port ${PORT} -> http://localhost:${PORT}`))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('views', './views')
app.set("view engine", "ejs")

app.use("/", router)