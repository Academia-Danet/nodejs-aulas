import { db } from "../db.js";

export const AddImage = (req, res) => {
    const file = req.file

    let q = ""
    let query = null
    if(req.query.user){
        q = "UPDATE users SET `img` = ? WHERE id = ?"
        query = req.query.user
    }else{
        q = "UPDATE posts SET `img` = ? WHERE id = ?"
        query = req.query.post
    }

    db.query(q, [file.filename, query], (err, data) => {
        if(err) return res.status(400).json(err)

        return res.status(200).json({message: "image added successfully", filename: file.filename})
    })
}