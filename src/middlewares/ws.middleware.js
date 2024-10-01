
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { con } from "../index.js";

function socketConnection(app){
    const wss=new WebSocketServer({server: app});

    wss.on("connection",(ws,req)=>{
        console.log("new connection")
        try{
            let token=req.headers?.cookie.split(";")[0].replace("ACCESS_TOKEN=","")
            let result=jwt.verify(token,process.env.ACCESS_TOKEN_SERCRET)
            ws.id=result.id
            console.log(result)
        }
        catch(err){
            console.log(err.message)
            ws.close(3000)
        }
        ws.on("message",async (data)=>{
            data=JSON.parse(data.toString())
            try{
                if(!data?.sender || !data?.recv || !data?.message){
                    ws.close(1007)
                }
                else{
                    await con.execute(" insert into chat_now.chats(sender,recv,message) values(?,?,?) ",[data.sender,data.recv,data.message])
                    wss.clients.forEach( (client)=>{
                        if(client.id==data.sender || client.id==data.recv){
                            client.send(JSON.stringify(data))
                        }
                    } )
                }
            }
            catch(err){
                console.log(err.message)
                ws.close(1011,err.message)
            }
        })
        ws.on("close",()=>{
            console.log("connection closed")
        })
    })
}

export {socketConnection}
