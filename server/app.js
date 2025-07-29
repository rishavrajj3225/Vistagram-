import express from "express";
import cors from 'cors';
const App = express();
import userRouter from "./routes/user.router.js";
import postRouter from "./routes/post.router.js";

App.use(express.urlencoded({
    extended:true,
    limit:"64kb",
}))
App.use(
    cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    })
);

App.use(express.json({
    limit:"64kb",
}));

App.use(express.static("public"));


App.get("/", (req, res) => {
    res.send("Welcome to Vistagram");
});
App.use("/api/v1/users", userRouter);
App.use("/api/v1/posts", postRouter);

export {App}