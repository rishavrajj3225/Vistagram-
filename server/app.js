import express from "express";
import cors from 'cors';
const App = express();

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
    limit:"32kb",
}));

App.use(express.static("public"));


App.get("/", (req, res) => {
    res.send("Welcome to Vistagram");
});

export {App}