import dotenv from "dotenv";
import mongoose from "mongoose";
import { App } from "./app.js";

dotenv.config();

//DB connection
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database connection successful!");
        App.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });
        App.listen(process.env.PORT, () => {
            console.log(`app is runnning on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("ERROR : ", error);
        throw error;
    }
})();
