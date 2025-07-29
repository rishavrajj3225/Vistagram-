// routes/upload.routes.js
import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/upload.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { toggleLike, incrementShareCount, getAllPosts, deletePost } from "../controllers/post.controller.js";


const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/create").post(
    upload.single("image"),
    verifyJWT,
    uploadFile
);
router.route("/like").put(verifyJWT, toggleLike);
router.route("/share").post(verifyJWT, incrementShareCount);
router.get("/all", getAllPosts);
router.route("/delete").delete(verifyJWT, deletePost);
export default router;
