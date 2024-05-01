const express = require("express")
const app = express()
const cloudRouter = require("./routes/cloudRouter")
const apiRouter = require("./routes/apiRouter")

const PORT = 8000

app.listen(PORT, console.log(`Listening on port ${PORT} -> http://localhost:${PORT}`))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('views', './src/views')
app.set("view engine", "ejs")

app.use("/cloud", cloudRouter)
app.use("/api", apiRouter)

app.get("/", (req,res) => {res.redirect("/cloud")})