import { config } from "dotenv";
import { MongoClient, Db, ObjectId } from "mongodb";
import { createClient } from "@supabase/supabase-js/dist/index.cjs";
const supabase = createClient("https://nfljfedthxdriygmdjbj.supabase.co","sb_publishable_5TFapm9wIOpjchyIu8D46Q_nkC8eFe5")
config()

const client = new MongoClient(process.env.DB_COINCTION)
/**
//  * @type {Db | null}
 */
let db = null;

/**
 * @returns {Promise<Db>}
 */
export async function getconnect() {
    try {
        if (!db) {
            await client.connect()
            db = client.db("start_mongo")
            console.log("DB connected")
        }  
    }
    catch (error) {
        console.log(error)
    }
}
export const registerUser  = async (req, res) => {
    try {
        console.log("start")
        const username=req.body.username
        const password=req.body.password
        console.log("2")
        const result = await db.collection("users").insertOne({username:username,password:password})
        console.log("1")
        res.send({"id": result, "username": username})
    }
    catch (error) {
        console.error(error)
    }
}
export const encryptmessage=async(req,res)=>{
    try{
        const user=await req.body.user
        const registerduser=await db.collection("users").findOne({username:user.username})
        if(registerduser){
            const registerdpassword=await db.collection("users").findOne({password:user.password})
            if(registerdpassword){
                const message=req.body.message
                const { error } = await supabase
                .from('messages')
                .insert({ id: message.id, username: message.username,cipher_type:message.cipher_type,encrypted_text:message.encrypted_text,inserted_at:message.inserted_at })
            }
        }
        res.send({id:message.id,cipher_type:message.cipher_type,encrypted_text:message.encrypted_text})
    }
    catch(error){
        console.log(error)
    }
}



