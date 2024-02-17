import { Router } from "express";
const router = Router()
import { postService } from "../controllers/postservice.controller.js";






router.route("/post-service").post(postService)

export default router