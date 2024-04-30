const fs = require("fs")
const path = require("path")
const cheerio = require("cheerio")

const urlQueuePath = path.join(__dirname, "../data/urlQueue.json")
const urlQueue = JSON.parse(fs.readFileSync(urlQueuePath, "utf-8"))

const wordDictionaryPath = path.join(__dirname, "../data/wordDictionary.json")
const wordDictionary = JSON.parse(fs.readFileSync(wordDictionaryPath, "utf-8"))

let urlQueueMap = new Map(Object.entries(urlQueue))

let wordMap = new Map(Object.entries(wordDictionary))

const controller = {

    cloud: (req, res) => {
        return res.render("index", { phrase: "Hello World" })
    },

    updateCloud: async (req, res) => {
        for(let [key, value] of urlQueueMap) {
            if (value == true) {
                let url = key
                const response = await fetch(url)
                const $ = await cheerio.load(await response.text())
                let prodDescription = await $("#productDescription").children("p").children("span").text().trim()
                prodDescription = await prodDescription.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ")
                const wordArr = await prodDescription.toLowerCase().split(" ")

                await wordArr.forEach(word => {
                    if (!wordMap.has(word)) {
                        wordMap.set(word, 1)
                    } else {
                        wordMap.set(word, wordMap.get(word) + 1)
                    }
                })
            }
        }

        const wordObj = await Object.fromEntries(wordMap)
        
        fs.writeFileSync(wordDictionaryPath, JSON.stringify(wordObj, null, "\t"))

        return await res.json(wordObj)
    }

}

module.exports = controller