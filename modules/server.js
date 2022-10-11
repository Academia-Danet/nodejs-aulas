const http = require("http")

const hostname = "127.0.0.1"
const port = 4000

const server = http.createServer((req, res) => {
    if(req.url == "/home"){
        res.setHeader("Content-Type","text/html")
        res.end("<h1>Hello, world!</h1>")
    }

    if(req.url == "/user"){
        const user = [
            {name: "jackson"},
            {name: "bruno"},
            {name: "bruna"},
        ]

        res.statusCode = 200
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify(user))
    }

})

server.listen(port, hostname, () => {
    console.log("servidor rodando na porta 4000");
})