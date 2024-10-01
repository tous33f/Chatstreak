
import {asyncHandler} from "../utils/AsyncHandler.js"
import { con } from "../index.js"
import { generateAccessToken,generateRefreshToken } from "../utils/GenerateTokens.js"

const signup=asyncHandler( async(req,res)=>{
    const {fullname,email,password}=req.body
    await con.execute(`insert into chat_now.user(name,email,pwd) values(?,?,?)`,[fullname,email,password])
    res.locals.user=null
    res.redirect("/u/login")
} )

const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const [rows,fields]=await con.execute(`select * from chat_now.user where email=?`,[email])
    if(rows.length<1 || password!=rows[0]?.pwd){
        res.locals.user=null
        res.render("login",{error: "Email or password is incorrect"})
    }
    else{
        const accessToken=generateAccessToken(rows[0].id,rows[0].name,rows[0].email)
        const refreshToken=generateRefreshToken(rows[0].id)
        res.cookie("ACCESS_TOKEN",accessToken,{maxAge: 1000*60*60*24})
        res.cookie("REFRESH_TOKEN",refreshToken,{maxAge: 1000*60*60*24*10})
        res.locals.user={ id: rows[0].id,name: rows[0].name,email: rows[0].email }
        res.redirect("/")
    }
})

const logout=asyncHandler(async(req,res)=>{
    res.clearCookie("ACCESS_TOKEN")
    res.clearCookie("REFRESH_TOKEN")
    res.redirect("/u/login")
})

export {signup,login,logout}
