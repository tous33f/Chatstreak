
import jwt  from "jsonwebtoken"

const generateAccessToken=(id,name,email)=>{
    const token=jwt.sign({
        id,name,email
    },process.env.ACCESS_TOKEN_SERCRET,{expiresIn: 1000*60*60*24,algorithm: "HS256"})
    return token
}

const generateRefreshToken=(id)=>{
    const token=jwt.sign({
        id
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn: 1000*60*60*24*10,algorithm: "HS256"})
    return token
}

export {generateAccessToken,generateRefreshToken}
