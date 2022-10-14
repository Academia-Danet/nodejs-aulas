import { db } from "../db.js";

export const getUsers = (req, res) => {
    const q = "SELECT id, username, email, img FROM users"

    db.query(q, (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json(data)
    })
}

export const getUser = (req, res) => {
    const q = "SELECT id, username, email, img FROM users WHERE id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json(data)
    })
}