
import path from "path"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from  "http"

const app=express()

const httpServer=http.createServer(app)

app.use(cors({"origin": "*"}))

app.use(cookieParser())

app.use(express.static("public"))

app.set("views",path.resolve("./src/views"))

app.set("view engine","ejs")

app.use(express.json({"limit": "16kb"}))

app.use(express.urlencoded({"extended": true}))

import { verifyAuth } from "../src/middlewares/auth.middleware.js"

// routes declaration
import userRoutes from "./routes/user.routes.js"
import homeRoutes from "./routes/home.routes.js"

//routes usage
app.use("/u",userRoutes)
app.use("/",verifyAuth,homeRoutes)

export {httpServer as app}
