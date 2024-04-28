const fs = require("fs")
const path = require("path")
const axios = require("axios")
const cheerio = require("cheerio")

const dataPath = path.join(__dirname, "./data.json")
let data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))

const controller = {

    cloud: (req, res) => {
        return res.render("index", {phrase: "Hello World"})
    },

    updateCloud: async (req, res) => {
        let url = req.query.productUrl
        let id
        console.log(url)
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const prodDescription = await $("#product-summary").children("p").children("span").text().trim()
        console.log(prodDescription, ": description")
        if(data[0] == undefined){
            id = 1
        }else{
            id = data[data.length - 1].id + 1
        }
        let newUrl = {
            "id": id,
            "url": url,
            "prod": prodDescription
        }
        data.push(newUrl)
        fs.writeFileSync(dataPath, JSON.stringify(data, null, "\t"))
        return res.send(`URL stored (ID:${id})`)
    }

}

module.exports = controller