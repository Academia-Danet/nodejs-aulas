import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    const q = "SELECT `username`, `title`, `desc`, p.img, u.img AS userImage, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(400).json(err)

        return res.status(200).json(data[0])
    })
}

export const addPost = (req, res) => {
    const {title, desc, img, date, cat} = req.body

    const token = req.cookies.cookie_token
    if(!token) return res.status(401).json("not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("token is not valid")

        const q = "INSERT INTO posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"
        const values = [title, desc, img, cat, date, userInfo.id]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(400).json(err)
    
            return res.status(200).json("post has been created")
        })
    })
}

export const updatePost = (req, res) => {
    const {title, desc, img, date, cat} = req.body

    const token = req.cookies.cookie_token
    if(!token) return res.status(401).json("not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("token is not valid")

        const postId = req.params.id
        const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ?, `date` = ? WHERE `id` = ? AND `uid` = ?"
        const values = [title, desc, img, cat, date]

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(400).json(err)
            if(data.affectedRows === 0) return res.status(400).json("you is not the owner of this post")
    
            return res.status(200).json("post has been updated")
        })
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.cookie_token
    if(!token) return res.status(401).json("not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("token is not valid")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(400).json(err)
            if(data.affectedRows === 0) return res.status(400).json("you can delete your own posts")
    
            return res.status(200).json("post has been deleted")
        })
    })
}
