const fs = require("fs")
const path = require("path")

const dataPath = path.join(__dirname, "../data/urlQueue.json")
let data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))

const controller = {

    list: (req, res) => {
        return res.json(data)
    },

    enqueue: (req, res) => {
        let url = req.query.productUrl
        let id
        console.log(url)
        if(data.length == 0){
            id = 1
        }else{
            id = data[data.length - 1].id + 1
        }
        let newUrl = {
            "id": id,
            "url": url,
        }
        data.push(newUrl)
        fs.writeFileSync(dataPath, JSON.stringify(data, null, "\t"))
        return res.send(`URL stored (ID:${id})`)
    }

}

module.exports = controller