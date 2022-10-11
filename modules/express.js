const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get("/user", (req, res) => {
    const user = [
        {name: "jackson"},
        {name: "bruno"},
        {name: "bruna"},
    ] 

    res.status(200).json(user)
})

app.listen(4000)