import express from "express"
import multer from "multer"
import path from "path"
import { AddImage } from "../controllers/uploads.js"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage})

router.post("/", upload.single("file"), AddImage)

export default router