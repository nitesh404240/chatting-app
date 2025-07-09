import { Router } from "express";
import { upload } from "../middleware/multer_middleware.js";
import { login, logoutUser, updatePassword ,updateprofilepic,checkAuth} from "../controllers/auth_user_controller.js";
import { sign_up } from "../controllers/auth_user_controller.js";
import {verifyJWT} from "../middleware/auth_middleware.js";

const router = Router()

router.route("/signup").post(sign_up)
router.route("/login").post(login)
router.route("/changepassword").post(verifyJWT,updatePassword)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/updateprofilepic").put(upload.single("profilepic"),verifyJWT,updateprofilepic)
router.route("/check").get(verifyJWT,checkAuth)
export default router