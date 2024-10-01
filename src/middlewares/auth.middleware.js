
import jwt  from "jsonwebtoken"
import { generateAccessToken } from "../utils/GenerateTokens.js"
import { con } from "../index.js"

const verifyAuth=async (req,res,next)=>{
    try{
        let accessToken=(req.headers.authorization?.replce('Bearer ')) || (req.cookies?.ACCESS_TOKEN)
        let refreshToken=req.cookies?.REFRESH_TOKEN
        if(!accessToken && !refreshToken){
            throw new Error("Access or refresh token not found")
        }
        if(accessToken){
            const payload=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SERCRET)
            res.locals.user=payload
            next()
        }
        else{
            const payload=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
            const [rows,fields]=await con.execute(`select * from chat_now.user where if=?`,[id])
            if(rows.length<1){
                throw new Error("User ID given in refresh token not found")
            }
            const accessToken=generateAccessToken(id,fields[0].name,fields[0].email)
            res.cookie("ACCESS_TOKEN",accessToken,{maxAge: 1000*60*60*24})
            res.locals.user={ id: rows[0].id,name: rows[0].name,email: rows[0].email }
            next()
        }
    }
    catch(err){
        console.log(err.message)
        res.redirect("/u/login")
    }
}

export {verifyAuth}
