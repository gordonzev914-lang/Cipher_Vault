import express from "express"
import {getconnect} from "./dataBase.js"
import route from "./routers.js"
import { createtable } from "./dataBase.js"
const port = 3000
createtable()
await getconnect()

const app=express()
app.use(express.json())

app.use("/api",route)


app.listen(port,()=>{
    console.log(`example app listening at http://localhost:${port}`)
})