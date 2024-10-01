
import { asyncHandler } from "../utils/AsyncHandler.js";
import { con } from "../index.js";

const getHome=asyncHandler(async (req,res)=>{
    const [rows,fields]=await con.execute(`select * from chat_now.user where id!=?`,[res.locals.user.id])
    let users=Array()
    rows.forEach(user => {
        users.push({id: user.id,name: user.name})
    });
    res.render("home",{users,selected: false})
})

const getMessages=async(req,res)=>{
    const {sender,recv}=req.body
    try{
        const [rows,fields]=await con.execute(`select * from chat_now.chats where (sender=? and recv=?) or (recv=? and sender=?) order by message_time asc`,[sender,recv,sender,recv])
        let messages=Array()
        rows.forEach(message=>{
            messages.push({sender: message.sender,recv: message.recv,message: message.message})
        });
        res.status(201).json({success: true,data: messages})
    }
    catch(err){
        res.status(401).json({succes: false,error: err.message})
    }
}

export {getHome, getMessages}
