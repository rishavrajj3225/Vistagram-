import { registerUser, loginUser,logoutUser, getCurrentUser} from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/currentuUser").get(getCurrentUser);

export default router;