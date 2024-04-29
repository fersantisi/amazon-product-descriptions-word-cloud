const fs = require("fs")
const path = require("path")
const axios = require("axios")
const cheerio = require("cheerio")

const urlQueuePath = path.join(__dirname, "../data/urlQueue.json")
let urlQueue = JSON.parse(fs.readFileSync(urlQueuePath, "utf-8"))

const wordDictionaryPath = path.join(__dirname, "../data/wordDictionary.json")
let wordDictionary = JSON.parse(fs.readFileSync(wordDictionaryPath, "utf-8"))

const controller = {

    cloud: (req, res) => {
        return res.render("index", {phrase: "Hello World"})
    },

    updateCloud: async (req, res) => {
        if(urlQueue.length == 0){
            return res.send("No data")
        }
        let url = await urlQueue[0].url
        const response = await axios.get(url)
        const $ = await cheerio.load(response.data)
        let prodDescription = await $("#product-summary").children("p").children("span").text().trim()
        prodDescription = await prodDescription.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ")
        const wordArr = await prodDescription.toLowerCase().split(" ")
        
        let wordMap = await new Map(Object.entries(wordDictionary))

        await wordArr.forEach(word => {
            if(!wordMap.has(word)){
                wordMap.set(word, 1)
            }else{
                wordMap.set(word, wordMap.get(word) + 1)
            }
        })
        console.log(wordMap);

        const wordObj = await Object.fromEntries(wordMap)

        await fs.writeFileSync(wordDictionaryPath, JSON.stringify(wordObj, null, "\t"))

        return await res.json(wordObj)
    }

}

module.exports = controller