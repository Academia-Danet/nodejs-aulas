import express from "express"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth.js"
import uploadRouter from "./routes/uploads.js"
import postsRouter from "./routes/posts.js"
import usersRouter from "./routes/users.js"

const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/posts", postsRouter)
app.use("/api/users", usersRouter)
app.use("/api/upload", uploadRouter)

app.listen(port, () => console.log("servidor rodando na porta 3000"))