import { registerUser, loginUser,logoutUser, getCurrentUser} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/current").get(verifyJWT, getCurrentUser);

export default router;