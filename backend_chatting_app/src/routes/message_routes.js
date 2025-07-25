import { getUserForSidebar,getMessages ,sendMessage} from "../controllers/message_controller.js";
import { verifyJWT } from "../middleware/auth_middleware.js";
import { Message } from "../model/message_model.js";
import { upload } from "../middleware/multer_middleware.js";
import { Router } from "express";

const router = Router()

router.route("/users").get(verifyJWT,getUserForSidebar)
router.route("/:id").get(verifyJWT,getMessages)
router.route("/send/:id").post(upload.single("image"),verifyJWT,sendMessage)
export default router