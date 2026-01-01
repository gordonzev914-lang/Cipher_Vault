import express from "express"
import { registerUser } from "./dataBase.js"
import (encryptmessage) from "./dataBase.js"




const route=express.Router()

route.post("/auth/register",registerUser)
route.post("messages/encrypt",encryptmessage)



export default route