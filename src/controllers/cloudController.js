const fs = require("fs")
const path = require("path")
const cheerio = require("cheerio")

const urlQueuePath = path.join(__dirname, "../data/urlQueue.json")

const urlsDequeuedPath = path.join(__dirname, "../data/urlsDequeued.json")
const urlsDequeued = JSON.parse(fs.readFileSync(urlsDequeuedPath, "utf-8"))

const wordDictionaryPath = path.join(__dirname, "../data/wordDictionary.json")
const wordDictionary = JSON.parse(fs.readFileSync(wordDictionaryPath, "utf-8"))

const stopWordsPath = path.join(__dirname, "../data/stopWords.txt")
const stopWords = fs.readFileSync(stopWordsPath, "utf-8")

let urlsDequeuedMap = new Map(Object.entries(urlsDequeued))

let wordMap = new Map(Object.entries(wordDictionary))

const stopWordsArr = stopWords.split("\n")
const stopWordsSet = new Set(stopWordsArr)

const controller = {

    cloud: (req, res) => {
        return res.render("index", { phrase: "Hello World" })
    },

    updateCloud: async (req, res) => {
        const urlQueue = JSON.parse(fs.readFileSync(urlQueuePath, "utf-8"))
        let urlQueueMap = new Map(Object.entries(urlQueue))

        for (let [key, value] of urlQueueMap) {
            if(!urlsDequeuedMap.has(key)){
                urlsDequeuedMap.set(key, value)
            }
        }

        for (let [key, value] of urlsDequeuedMap) {
            if (value == true) {
                let url = key
                console.log(url);
                const response = await fetch(url, {
                    "headers": {
                        "cookie": "x-main=\"Q9xyfFPTPSXsLd?Xwu1hpORu9ddvJkIHNFPks?doo2E31UjFGaaF9q1?pdFCmPfN\";"
                    },
                    "method": "GET"
                });

                const $ = await cheerio.load(await response.text())
                let prodDescription = await $("#productDescription").text().trim()
                console.log(prodDescription);
                prodDescription = await prodDescription.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, " ")
                const wordArr = await prodDescription.toLowerCase().split(" ")

                await wordArr.forEach(word => {
                    if (!stopWordsSet.has(word)) {
                        if (!wordMap.has(word)) {
                            if (word != "") {
                                wordMap.set(word, 1)
                            }
                        } else {
                            wordMap.set(word, wordMap.get(word) + 1)
                        }
                    }
                })
            }
            urlsDequeuedMap.set(key, false)
        }

        const maxVal = Math.max(...wordMap.values())

        const wordObj = await Object.fromEntries(wordMap)
        const urlsDequeuedObj = await Object.fromEntries(urlsDequeuedMap)

        fs.writeFileSync(urlsDequeuedPath, JSON.stringify(urlsDequeuedObj, null, "\t"))
        fs.writeFileSync(wordDictionaryPath, JSON.stringify(wordObj, null, "\t"))

        await res.render('./index', {map: wordMap, maxVal})

}
}

module.exports = controller