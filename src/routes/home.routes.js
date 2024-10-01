
import { Router } from "express";
import { getHome, getMessages } from "../controllers/home.controllers.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/").get(getHome)

router.route("/api/v1/messages").post(getMessages)

export default router
