const fs = require("fs")
const path = require("path")
const cheerio = require("cheerio")

const urlQueuePath = path.join(__dirname, "../data/urlQueue.json")
//const urlQueue = JSON.parse(fs.readFileSync(urlQueuePath, "utf-8"))

const wordDictionaryPath = path.join(__dirname, "../data/wordDictionary.json")
const wordDictionary = JSON.parse(fs.readFileSync(wordDictionaryPath, "utf-8"))

const stopWordsPath = path.join(__dirname, "../data/stopWords.txt")
const stopWords = fs.readFileSync(stopWordsPath, "utf-8")

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
            if (value == true) {
                let url = key
                console.log(url);
                const response = await fetch(url, {
                    "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "accept-language": "en-US,en;q=0.9,gl;q=0.8",
                        "cache-control": "max-age=0",
                        "device-memory": "8",
                        "downlink": "9.05",
                        "dpr": "1",
                        "ect": "4g",
                        "priority": "u=0, i",
                        "rtt": "150",
                        "sec-ch-device-memory": "8",
                        "sec-ch-dpr": "1",
                        "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Linux\"",
                        "sec-ch-viewport-width": "749",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "none",
                        "sec-fetch-user": "?1",
                        "upgrade-insecure-requests": "1",
                        "viewport-width": "749",
                        "cookie": "session-id=133-0834229-3083803; ubid-main=134-4398712-9449949; lc-main=en_US; x-main=\"Q9xyfFPTPSXsLd?Xwu1hpORu9ddvJkIHNFPks?doo2E31UjFGaaF9q1?pdFCmPfN\"; at-main=Atza|IwEBIGEyA-ZWvPbwMFptGO_58i5Pf-bIbbFiHcD_whP05AYv_8NfhHpN-xDNXjnG4qCBdaoy7LjuzlyOU9OCwD1tx_TwhaWcoToiMOEsvTviaRjHDHnDEXPDqRzKL5iPFER-IXvJH_blLomvUgTJYQAkoLhbglaEE7vAPEbqUPmyhl0lQvYsUfKJm9fbX5r08RIxN-BYYj001EWsZIRQrCDW-vKyv7Pkii0axUXYpyOnyTR3gA; sess-at-main=\"lVjGgX0gkZjmXoEn2ifzpERLgA0aVctZei0x142A2uk=\"; sst-main=Sst1|PQGHQbijtAKUpOpqsnSWGThbCatSQHkPnrH2U_zaK1C0ozz0KJyS1rzOOH5d095y-tcM6C8sxtLiCBMSEyF9W0eqkxtdzLj6iiZUD5GDjDeT7VmQN499L4aLijSDdwKja_0lNZ_c_Ftb8bPQtuiDFApPLsiYWu6WGA03eY9edg86NmZk78fvWivMtKqFxeYfKGd8EnWLe3Q-5fa-TlYeR3j7gmkr85XT7hZw6l_bDMbwRxihcPQTKcArLSExY0tmWQb7M6rjHwYgUxHBB17SRliSBFItRgylLb61HCy1Tg7Y0V0; i18n-prefs=USD; session-id-time=2082787201l; JSESSIONID=86CB5D0D9D59FCBCA14C4D097BE33EBC; session-token=Ob0za9vDDWq98xM7sdodKV76J2kyeY4gfjI9A7Kvsk1hMrkQPjl7EFyxrMbwSaoAIyHYsD0KP8F82XcVH4/1piayOsE3vW5z19cx34/L+AExDsYAnWVn46clhhtBKPYGpAm4Tvw0KyXbs3xU5OQ434Xal/NsYNmXE6UJ8o/rU70vl/rgghHaONib0KTcr+z6lXQMH0HUB6dl4EpiTSugDmGRnvon67M0d9f/xJd4YeFtLJri5l3f+caIFGj/CHKLrpPQtqKf6k68xMStBjpsUwwKUwzQZSrFSnkSZAMJVE44LAbOLe7MsjipFN25s4hlI+wqlOxd0gLPKbaVlVGWN5aaRUg+/jLhI8NpyYjykiEB5CB7sTY6sjV0NGXCPdGh; csm-hit=tb:s-RCZZ6Z8TSQBNF6EJ1RA1|1714472792935&t:1714472795079&adb:adblk_yes"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET"
                });

                const $ = await cheerio.load(await response.text())
                let prodDescription = await $("#productDescription").children("p").children("span").text().trim()
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
            urlQueueMap.set(key, false)
        }

        const wordObj = await Object.fromEntries(wordMap)
        const urlQueueObj = await Object.fromEntries(urlQueueMap)

        fs.writeFileSync(urlQueuePath, JSON.stringify(urlQueueObj, null, "\t"))
        fs.writeFileSync(wordDictionaryPath, JSON.stringify(wordObj, null, "\t"))

        return await res.json(wordObj)
    }

}

module.exports = controller