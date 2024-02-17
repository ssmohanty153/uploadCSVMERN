import { Router } from "express";

const router = Router()


import { finduser, uploadcsv,aggregateduser } from "../controllers/policy.controlles.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/upload").post(upload.single('file'), uploadcsv)
router.route("/policy-info/:username").get(finduser)
router.route("/aggregated").get(aggregateduser)



export default router