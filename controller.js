const fs = require("fs")
const path = require("path")
const { log } = require("console")

const dataPath = path.join(__dirname, "./data.json")
let data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))

const controller = {

    cloud: (req, res) => {
        return res.render("index", {phrase: "Hello World"})
    },

    updateCloud: (req, res) => {
        let url = req.query.productUrl
        console.log(url)
        let prodDescription = "hello world"
        let newUrl = {
            "url": url,
            "prod": prodDescription
        }
        data.push(newUrl)
        fs.writeFileSync(dataPath, JSON.stringify(data, null, "\t"))
        return res.render("index", {phrase: url})
    }

}

module.exports = controller