const express = require('express')
const db = require("./db")

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users"

    db.query(q, (err, data) => {
        if(err) return res.json(err)

        return res.json(data)
    })
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id
    const q = "SELECT * FROM users WHERE id = ?"

    db.query(q, id, (err, data) => {
        if(err) return res.status(500).json(err)

        return res.json(data).status(200)
    })
})

app.post("/users", (req, res) => {
    const {username, email, password} = req.body
    const q = "INSERT INTO users(username, email, password) VALUES (?)"
    const values = [username, email, password]

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.json({message: "user has been created"}).status(201)
    })
})

app.patch("/users", (req, res) => {
    const {id, username, email, password} = req.body
    const q = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?"
    const values = [username, email, password, id]

    db.query(q, [...values], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.json({message: "user has been updated"}).status(201)
    })
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM users WHERE id = ?"

    db.query(q, id, (err, data) => {
        if(err) return res.status(500).json(err)

        return res.json({message: "user has been deleted"}).status(200)
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))