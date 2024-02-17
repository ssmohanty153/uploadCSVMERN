import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit: "100kb"
}))
app.use(express.urlencoded({ extended: true, limit: "100kb" }))

app.use(express.static("public"));


app.on("error", (error) => {
    console.error("Error", error);
    throw error;
})

//routes


import userRouter from './routers/policy.routers.js'
import postServiceRouter from './routers/postServiceRouter.js'

//routees declarton

app.use("/api/v1",userRouter)
app.use("/api/v2",postServiceRouter)

export { app }