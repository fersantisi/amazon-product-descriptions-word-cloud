const mainController = {

    helloWorld: (req, res) => {
        res.render("index", {phrase: "Hello World"})
    }

}

module.exports = mainController