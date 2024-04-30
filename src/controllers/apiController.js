const fs = require("fs")
const path = require("path")

const urlQueuePath = path.join(__dirname, "../data/urlQueue.json")
const urlQueue = JSON.parse(fs.readFileSync(urlQueuePath, "utf-8"))

let urlQueueMap = new Map(Object.entries(urlQueue))

const controller = {

    list: async (req, res) => {
        const urlQueueObj = await Object.fromEntries(urlQueueMap)
        return res.json(urlQueueObj)
    },

    enqueue: async (req, res) => {
        let url = req.query.productUrl
        if(urlQueueMap.has(url)){
            console.log(`URL already in queue: ${url}`)
            return res.send(`URL already in queue: ${url}\n`)
        }
        urlQueueMap.set(url, true)
        const urlQueueObj = await Object.fromEntries(urlQueueMap)
        fs.writeFileSync(urlQueuePath, JSON.stringify(urlQueueObj, null, "\t"))
        console.log(`URL enqueued: ${url}`);
        return res.send(`URL enqueued: ${url}\n`)
    }

}

module.exports = controller