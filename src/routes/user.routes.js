
import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controllers.js";

const router=Router()

//get routes

router.route("/signup").get((req,res)=>{
    res.locals.user=null
    res.render("signup")
})

router.route("/login").get((req,res)=>{
    res.locals.user=null
    res.render("login",{error: null})
})

router.route("/logout").get(logout)

//post routes

router.route("/signup").post(signup)

router.route("/login").post(login)

export default router
